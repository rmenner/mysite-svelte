import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import dotenv from 'dotenv';
import fs from 'node:fs/promises';
import path from 'node:path';

// Load environment variables
dotenv.config();

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, url }) {
  // Only allow access from localhost in development or when specifically requested
  const hostname = url.hostname;
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
  
  // In production, only allow if explicitly coming from localhost
  if (!dev && !isLocal) {
    throw error(403, 'PDF generation only available locally');
  }
  
  // Additional check for specific header to ensure it's our script calling
  const isPdfScript = request.headers.get('x-pdf-generator') === 'internal';
  
  if (!dev && !isPdfScript) {
    throw error(403, 'Access restricted');
  }
  
  const jobsFileName = process.env.RESUME_JOBS_FILE || 'jobs.json';
  const jobsPath = path.resolve('src/data', jobsFileName);
  const jobs = JSON.parse(await fs.readFile(jobsPath, 'utf-8'));

  return {
    isPdfMode: true,
    contactInfo: {
      name: process.env.RESUME_NAME || 'Your Name',
      email: process.env.RESUME_EMAIL || 'your.email@example.com',
      phone: process.env.RESUME_PHONE || '(555) 123-4567',
      website: process.env.RESUME_WEBSITE || 'https://yourwebsite.com',
      linkedin: process.env.RESUME_LINKEDIN || 'linkedin.com/in/ryanmenner',
      github: process.env.RESUME_GITHUB || 'github.com/rmenner'
    },
    customOverview: process.env.RESUME_CUSTOM_OVERVIEW || null,
    jobs
  };
}