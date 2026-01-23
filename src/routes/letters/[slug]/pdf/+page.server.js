import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const LETTERS_DIR = path.resolve('./letters');

// Function to interpolate frontmatter variables in markdown
function interpolateVariables(markdown, frontmatter) {
  let result = markdown;
  
  // Replace {{variable}} syntax with frontmatter values
  for (const [key, value] of Object.entries(frontmatter)) {
    if (typeof value === 'string') {
      const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
      result = result.replace(regex, value);
    }
  }
  
  return result;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, request, url }) {
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

  const { slug } = params;
  const filePath = path.join(LETTERS_DIR, `${slug}.md`);

  try {
    if (!fs.existsSync(filePath)) {
      throw error(404, 'Letter not found');
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: markdown } = matter(content);
    
    // Interpolate frontmatter variables into markdown
    const interpolatedMarkdown = interpolateVariables(markdown, frontmatter);
    const html = marked(interpolatedMarkdown);

    return {
      isPdfMode: true,
      letter: {
        slug,
        frontmatter,
        html,
        title: frontmatter.company || frontmatter.title || slug,
        company: frontmatter.company,
        jobTitle: frontmatter.jobTitle || frontmatter.job_title,
        date: frontmatter.date || new Date(fs.statSync(filePath).mtime).toISOString().split('T')[0]
      },
      contactInfo: {
        name: process.env.RESUME_NAME || 'Your Name',
        email: process.env.RESUME_EMAIL || 'your.email@example.com',
        phone: process.env.RESUME_PHONE || '(555) 123-4567',
        website: process.env.RESUME_WEBSITE || 'https://yourwebsite.com',
        linkedin: process.env.RESUME_LINKEDIN || 'linkedin.com/in/yourprofile',
        github: process.env.RESUME_GITHUB || 'github.com/yourusername'
      }
    };
  } catch (err) {
    if (err.status) throw err;
    console.error('Error loading letter for PDF:', err);
    throw error(500, 'Failed to load letter');
  }
}
