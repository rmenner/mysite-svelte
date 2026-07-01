// Local resume grader. Replicates faangtechleads.com/resume/review: renders the
// resume (the same text a parser sees), grades it against the public FAANG Tech
// Leads guide stored in the Obsidian vault, and emits the same category/score/
// suggestion report — using local CLIs (no API key needed).
//
// Two engines, runnable at once:
//   claude  -> `claude -p`        (Anthropic / Claude)
//   codex   -> `codex exec`       (OpenAI / GPT-5-class, closest to the real tool)
//
// Usage:
//   npm run grade                          # both engines, default role, ats channel
//   npm run grade -- --engine=claude       # one engine
//   npm run grade -- --target=ui-engineer --save
//   npm run grade -- --model=opus          # claude model (sonnet|opus|haiku|id)
//
// Requires the dev server running (npm run dev). `claude` and/or `codex` must be installed.

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split('=').slice(1).join('=') : fallback;
};
const channel = getArg('channel', 'ats');
const model = getArg('model', 'sonnet'); // claude model
const engine = getArg('engine', 'both'); // claude | codex | both
const save = args.includes('--save');

const site = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/site.json'), 'utf8'));
const target = getArg('target', site.defaultTarget);

const guideDir =
  process.env.GUIDE_DIR ||
  path.join(
    os.homedir(),
    'Vault/Documents/Projects/App Search & Prepare/FAANG Tech Leads Resume Guide Research/source'
  );
const PORT = process.env.PORT || '5173';

function loadGuide() {
  if (!fs.existsSync(guideDir)) {
    throw new Error(`Guide dir not found: ${guideDir}\nSet GUIDE_DIR to the FAANG guide .md folder.`);
  }
  return fs
    .readdirSync(guideDir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => `\n### GUIDE FILE: ${f}\n\n${fs.readFileSync(path.join(guideDir, f), 'utf8')}`)
    .join('\n');
}

// Extract exactly the resume container (balanced <div> nesting), so page chrome —
// the role switcher, site nav, footer — never reaches the grader.
function extractContainer(html, className) {
  const at = html.indexOf(`class="${className}`);
  if (at === -1) return null;
  const start = html.lastIndexOf('<div', at);
  if (start === -1) return null;
  const re = /<\/?div\b[^>]*>/gi;
  re.lastIndex = start;
  let depth = 0;
  let m;
  while ((m = re.exec(html))) {
    depth += m[0].startsWith('</') ? -1 : 1;
    if (depth === 0) return html.slice(start, m.index + m[0].length);
  }
  return html.slice(start);
}

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<\/(div|p|li|h[1-6]|section|ul|tr|header)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');
}

async function loadResumeText() {
  const url = `http://localhost:${PORT}/resume/${channel}?target=${encodeURIComponent(target)}`;
  const res = await fetch(url, { headers: { 'x-pdf-generator': 'internal' } });
  if (!res.ok) throw new Error(`Could not fetch ${url} (${res.status}). Is the dev server running?`);
  const html = await res.text();
  const container = extractContainer(html, channel === 'ats' ? 'ats' : 'page') || html;
  return htmlToText(container);
}

function buildPrompt(guide, resume, engineLabel) {
  return `You are a strict, experienced FAANG-level resume reviewer — the same kind used by faangtechleads.com/resume/review. Grade the RESUME against the GUIDE.

OUTPUT: reply with ONLY a markdown report in EXACTLY this structure, nothing before or after:

# Resume Review Report

*Generated locally with ${engineLabel}*

**Overall Score: X.X/10**

| Category | Score |
| --- | --- |
| ATS Compatibility | X.X/10 |
| Format & Presentation | X.X/10 |
| Contact information | X.X/10 |
| Professional summary | X.X/10 |
| Work experience | X.X/10 |
| Technical skills | X.X/10 |
| Education | X.X/10 |

## Summary
<2-3 sentence overall read>

### Strengths
- **[High|Medium|Low]** ...

### Areas of Improvement
- **[High|Medium|Low]** ...

## <one section per category above>
Each with: **Score: X.X/10**, a one-line rationale, ### Strengths, ### Suggestions, and ### Suggested Rewrites (only where a concrete bullet rewrite helps; quote the current line, then an improved version).

SCORING RULES:
- Score each category out of 10 to one decimal. Overall MUST equal the mean of the 7 category scores, rounded to one decimal.
- Be calibrated and critical, like a real gatekeeper. Do NOT inflate; reserve 9+ for genuinely excellent.
- Judge strictly against the GUIDE. Treat the RESUME as plain text an ATS parser would extract.
- Do not invent facts about the candidate; use only the resume text and the guide.

=== GUIDE (the rubric) ===
${guide}

=== RESUME (target: ${target}, channel: ${channel}) ===
${resume}
`;
}

function run(cmd, cmdArgs, input) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, cmdArgs, { stdio: ['pipe', 'pipe', 'ignore'] });
    let out = '';
    child.stdout.on('data', (d) => (out += d));
    child.on('error', reject);
    child.on('close', (code) =>
      code === 0 ? resolve(out.trim()) : reject(new Error(`${cmd} exited ${code}`))
    );
    child.stdin.write(input);
    child.stdin.end();
  });
}

const ENGINES = {
  claude: {
    label: `Claude (${model})`,
    run: (prompt) => run('claude', ['-p', '--model', model], prompt)
  },
  codex: {
    label: 'Codex (GPT-5)',
    run: (prompt) =>
      run('codex', ['exec', '--skip-git-repo-check', '--dangerously-bypass-approvals-and-sandbox'], prompt)
  }
};

async function main() {
  const which = engine === 'both' ? ['claude', 'codex'] : [engine];
  if (which.some((e) => !ENGINES[e])) throw new Error(`--engine must be claude, codex, or both`);

  console.error(`Grading ${target} / ${channel} with: ${which.join(' + ')} ...`);
  const guide = loadGuide();
  const resume = await loadResumeText();
  if (resume.length < 200) throw new Error('Resume text looks too short — check the route/selector.');

  const results = await Promise.allSettled(
    which.map((e) => ENGINES[e].run(buildPrompt(guide, resume, ENGINES[e].label)).then((r) => ({ e, r })))
  );

  for (const settled of results) {
    if (settled.status === 'fulfilled') {
      const { e, r } = settled.value;
      process.stdout.write(`\n${'='.repeat(72)}\n  ENGINE: ${e}\n${'='.repeat(72)}\n\n${r}\n`);
      if (save) {
        const out = path.join(os.homedir(), `resume-grade-${target}-${e}-${new Date().getFullYear()}.md`);
        fs.writeFileSync(out, r + '\n');
        console.error(`✓ saved: ${out}`);
      }
    } else {
      process.stdout.write(`\n${'='.repeat(72)}\n  ENGINE FAILED: ${settled.reason.message}\n${'='.repeat(72)}\n`);
    }
  }
}

main().catch((e) => {
  console.error(`\n✗ ${e.message}`);
  process.exit(1);
});
