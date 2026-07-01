import experience from '$data/experience.json';
import channels from '$data/channels.json';
import designSystemsEngineer from '$data/roles/design-systems-engineer.json';
import frontendPlatform from '$data/roles/frontend-platform.json';
import seniorFrontend from '$data/roles/senior-frontend.json';
import uiEngineer from '$data/roles/ui-engineer.json';

// Canonical job facts, addressed by id. Bullet text lives here exactly once;
// role recipes only reference bullets by id, so fancy and ats cannot contradict.
const jobById = Object.fromEntries(experience.map((j) => [j.id, j]));

// Role targets, addressed by slug.
export const roles = {
  [designSystemsEngineer.id]: designSystemsEngineer,
  [frontendPlatform.id]: frontendPlatform,
  [seniorFrontend.id]: seniorFrontend,
  [uiEngineer.id]: uiEngineer
};

export function getRole(id) {
  return roles[id] || null;
}

// Resolve a role + channel into a ready-to-render document. Channels (web, fancy,
// ats) are renderers: they pick a recipe and a date label, never content. `fancy`
// and `ats` both use the role's `print` recipe, so their content is identical.
export function compileResume(role, channel) {
  const ch = channels[channel] || {};
  // fancy may carry a curated subset of `print` (fewer bullets to fit one page); it
  // references the same bullet ids, so it can only ever be a shorter version of ats.
  const recipe =
    channel === 'web'
      ? role.web || role.print
      : channel === 'fancy'
        ? role.fancy || role.print
        : role.print;

  const jobs = recipe.experience.map((entry) => {
    const job = jobById[entry.ref];
    if (!job) throw new Error(`compileResume: unknown job ref "${entry.ref}"`);

    // A summary renders only when the entry explicitly names one (so header-only
    // earlier roles, which omit `summary`, render as company/title/dates only).
    const summary = entry.summary ? job.summaries?.[entry.summary] || '' : '';

    const bullets = (entry.bullets || []).map((id) => {
      const bullet = job.bullets.find((b) => b.id === id);
      if (!bullet) throw new Error(`compileResume: unknown bullet "${entry.ref}.${id}"`);
      return bullet.text;
    });

    return {
      id: job.id,
      company: job.company,
      location: job.location,
      title: entry.title || job.title,
      start: job.start,
      end: job.end === 'Current' ? ch.endLabel || 'Current' : job.end,
      summary,
      bullets
    };
  });

  const headline = channel === 'web' ? role.web?.headline || role.headline : role.headline;
  const summary = channel === 'web' ? role.web?.summary || role.summary : role.summary;

  return { id: role.id, headline, summary, jobs };
}
