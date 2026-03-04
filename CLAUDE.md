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
npm run pdf          # Generate resume PDF → resume-{year}.pdf
npm run pdf:letter   # Generate cover letter PDF → letters-pdf/{slug}-{year}.pdf
```

No test suite exists in this project.

## Architecture

**Personal resume/portfolio site** built with SvelteKit 2 + Tailwind CSS 3, deployed on Netlify.

### Routing

SvelteKit file-based routing in [src/routes/](src/routes/):
- `/` — About/home page
- `/resume` — Resume with jobs, skills, and testimonials
- `/projects` — Project showcase
- `/letters` — Cover letters (localhost-only, returns 403 in production)
- `/resume/pdf` and `/letters/[slug]/pdf` — Print-layout pages used by Puppeteer for PDF generation (authenticated via `x-pdf-generator: internal` header)

### Data Flow

Static content lives in [src/data/](src/data/) as JSON/YAML files:
- `resume.yml` — Overview text (supports markdown)
- `jobs.json` / `jobs-staff-engineer.json` — Employment history (custom files per role)
- `projects.json`, `skills.json`, `compliments.json` — Other resume content

Cover letters are markdown files with YAML frontmatter in a `/letters/` directory (gitignored). The `[slug]/+page.server.js` loads them, parses frontmatter with `gray-matter`, and interpolates `{{variable}}` placeholders from frontmatter into the letter body.

Server-side `load()` functions in `+page.server.js` files handle data fetching. Sensitive routes check `url.hostname` and throw 403 if not `localhost`/`127.0.0.1`/`::1`.

### PDF Generation

[scripts/generate-resume-pdf.js](scripts/generate-resume-pdf.js) uses Puppeteer to render the `/resume/pdf` or `/letters/[slug]/pdf` routes and save PDFs to disk. Requires `.env` with contact info (`RESUME_NAME`, `RESUME_EMAIL`, `RESUME_PHONE`, `RESUME_WEBSITE`, `RESUME_LINKEDIN`, `RESUME_GITHUB`, `RESUME_CUSTOM_OVERVIEW`).

### Path Aliases

- `$data` → `src/data/`
- `$components` → `src/components/`

### Styling Notes

- Dark mode is class-based (`dark:` Tailwind prefix); toggled via `document.documentElement.classList` and persisted to `localStorage.theme`
- Print/PDF-specific styles use `print:` Tailwind prefix
- Custom Tailwind font: `font-display` = Lato (Google Fonts)
- Custom animations: `animate-rocket`, `animate-rocket-wiggle`
