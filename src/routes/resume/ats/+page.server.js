import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import dotenv from 'dotenv';
import { getRole, compileResume } from '$lib/resume.js';
import site from '$data/site.json';

// Load environment variables
dotenv.config();

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, url }) {
  // Only allow access from localhost in development or when specifically requested
  const hostname = url.hostname;
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';

  if (!dev && !isLocal) {
    throw error(403, 'PDF generation only available locally');
  }

  const isPdfScript = request.headers.get('x-pdf-generator') === 'internal';
  if (!dev && !isPdfScript) {
    throw error(403, 'Access restricted');
  }

  // Pick the role target (?target=, RESUME_ROLE env, or the site default), then
  // compile it for the ats channel. fancy uses the same `print` recipe, so the two
  // PDFs always carry identical content.
  const targetId = url.searchParams.get('target') || process.env.RESUME_ROLE || site.defaultTarget;
  const role = getRole(targetId);
  if (!role) {
    throw error(404, `Unknown resume target: ${targetId}`);
  }

  const resume = compileResume(role, 'ats');
  // Per-application overrides (shared with the fancy channel) for a specific posting.
  if (process.env.RESUME_ATS_HEADLINE && process.env.RESUME_ATS_HEADLINE.trim()) {
    resume.headline = process.env.RESUME_ATS_HEADLINE;
  }
  if (process.env.RESUME_ATS_OVERVIEW && process.env.RESUME_ATS_OVERVIEW.trim()) {
    resume.summary = process.env.RESUME_ATS_OVERVIEW;
  }

  const phone = process.env.RESUME_PHONE || '(555) 123-4567';
  const normalizedPhone = phone.startsWith('+') ? phone : `+1 ${phone}`;

  return {
    isPdfMode: true,
    contactInfo: {
      name: process.env.RESUME_NAME || 'Your Name',
      email: process.env.RESUME_EMAIL || 'your.email@example.com',
      phone: normalizedPhone,
      location: process.env.RESUME_LOCATION || '',
      website: process.env.RESUME_WEBSITE || 'https://yourwebsite.com',
      linkedin: process.env.RESUME_LINKEDIN || 'linkedin.com/in/ryanmenner',
      github: process.env.RESUME_GITHUB || 'github.com/rmenner'
    },
    resume
  };
}
