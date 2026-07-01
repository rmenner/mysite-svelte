# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:5173

# Build
npm run build        # Production build
npm run preview      # Preview production build

# PDF Generation (requires dev server running)
npm run pdf          # Generate designed resume PDF (/resume/fancy) → resume-{year}.pdf
npm run pdf:ats      # Generate ATS resume PDF (/resume/ats) → resume-ats-{year}.pdf
npm run pdf:letter   # Generate cover letter PDF → letters-pdf/{slug}-{year}.pdf
```

No test suite exists in this project.

## Architecture

**Personal resume/portfolio site** built with SvelteKit 2 + Tailwind CSS 3, deployed on Netlify.

### Routing

SvelteKit file-based routing in [src/routes/](src/routes/):
- `/` — About/home page
- `/resume` — Resume with jobs, skills, and testimonials
- `/resume/ats` — Single-column, ATS-optimized resume (keyword-led summary + skills from `resume.yml`'s `ats*` fields); the version uploaded to the external AI resume review tool
- `/projects` — Project showcase
- `/letters` — Cover letters (localhost-only, returns 403 in production)
- `/resume/fancy` and `/letters/[slug]/pdf` — Print-layout pages used by Puppeteer for PDF generation (authenticated via `x-pdf-generator: internal` header). `/resume/fancy` is the "fancy" channel (the designed two-column resume); was previously `/resume/pdf`.

### Data Flow

The resume uses a **canonical facts + role recipes + channel renderers** model (see the vault note `Resume Data Model.md`). Three layers in [src/data/](src/data/):
- `experience.json` — canonical job facts; every bullet has a stable `id`. Bullet/role text lives here exactly once.
- `roles/*.json` — role-target recipes (`design-systems-engineer` is the default; plus `frontend-platform`, `senior-frontend`, `ui-engineer`). Each holds a headline, summary, and which bullets in what order (by id) per channel. They reference facts by id; they never restate text.
- `channels.json` — per-channel render rules (date label). `site.json` — the website's default role.
- `src/lib/resume.js` — `compileResume(role, channel)` joins these into a render-ready document. `web`, `fancy`, and `ats` are channels; **`fancy` and `ats` both use the role's `print` recipe, so their content is identical by construction** (fancy just shows fewer details, e.g. it drops per-job summaries and condenses earlier roles to fit one page).
- Other content: `resume.yml` (ats skills taxonomy + education only), `projects.json`, `skills.json` (web/fancy sidebar skills — a separate taxonomy from the ats one, not yet role-driven), `compliments.json`.

Cover letters are markdown files with YAML frontmatter in a `/letters/` directory (gitignored). The `[slug]/+page.server.js` loads them, parses frontmatter with `gray-matter`, and interpolates `{{variable}}` placeholders from frontmatter into the letter body.

Server-side `load()` functions in `+page.server.js` files handle data fetching. Sensitive routes check `url.hostname` and throw 403 if not `localhost`/`127.0.0.1`/`::1`.

### PDF Generation

[scripts/generate-resume-pdf.js](scripts/generate-resume-pdf.js) uses Puppeteer to render the `/resume/fancy`, `/resume/ats`, or `/letters/[slug]/pdf` routes and save PDFs to disk. Requires `.env` with contact info (`RESUME_NAME`, `RESUME_EMAIL`, `RESUME_PHONE`, `RESUME_WEBSITE`, `RESUME_LINKEDIN`, `RESUME_GITHUB`). Both resume routes inject contact info from `.env` only when the `x-pdf-generator: internal` header is present. Pick a role variant with `--target=<role>` (e.g. `npm run pdf -- --target=ui-engineer`).

There is also a **localhost-only generate endpoint** at `/resume/generate?channel=fancy|ats[&target=...]` (`+server.js`): it runs Puppeteer and streams the PDF as a download. The `/resume` page shows "Download designed PDF" / "Download ATS PDF" buttons, but only on localhost (Puppeteer is a dev dependency and the endpoint 403s off-localhost).

### Resume targeting & ATS review

The resume content is deliberately tuned for job targeting; the substantive decisions, voice constraints, evidence bank, and role variants live in the Obsidian vault, not this repo:
`~/Vault/Documents/Projects/App Search & Prepare/FAANG Tech Leads Resume Guide Research/` (start at `SESSION HANDOFF 2026-06-28.md`).

- The **ATS resume** (`/resume/ats`) is the variant uploaded to an external "AI Resume Review" tool (GPT-5.5). Re-running that review = `npm run pdf:ats` → upload `~/resume-ats-{year}.pdf`. See `AI Resume Review Workflow.md` in that vault folder.
- **Per-application overrides** select a role variant (`RESUME_ROLE` env, `--target=`, or `?target=`) and optionally override the print headline/summary via `RESUME_ATS_HEADLINE` / `RESUME_ATS_OVERVIEW` (these apply to **both** fancy and ats so they stay matched). Documented in `example.env`.
- Resume **copy/voice edits require explicit approval**; resume **formatting/CSS/design edits route through the Codex CLI**. The vault handoff documents these constraints in full.

### Path Aliases

- `$data` → `src/data/`
- `$components` → `src/components/`

### Styling Notes

- Dark mode is class-based (`dark:` Tailwind prefix); toggled via `document.documentElement.classList` and persisted to `localStorage.theme`
- Print/PDF-specific styles use `print:` Tailwind prefix
- Custom Tailwind font: `font-display` = Lato (Google Fonts)
- Custom animations: `animate-rocket`, `animate-rocket-wiggle`
