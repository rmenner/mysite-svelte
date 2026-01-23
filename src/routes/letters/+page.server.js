import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const LETTERS_DIR = path.resolve('./letters');

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
  // Only allow access from localhost in development or when specifically requested
  const hostname = url.hostname;
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
  
  // In production, only allow if explicitly coming from localhost
  if (!dev && !isLocal) {
    throw error(403, 'Letters only available locally');
  }

  try {
    // Check if letters directory exists
    if (!fs.existsSync(LETTERS_DIR)) {
      return {
        letters: [],
        message: 'Letters directory not found. Clone your gist to ./letters/'
      };
    }

    const files = fs.readdirSync(LETTERS_DIR);
    const letters = [];

    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      
      const filePath = path.join(LETTERS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(content);
      
      const slug = file.replace('.md', '');
      
      letters.push({
        slug,
        title: frontmatter.company || frontmatter.title || slug,
        company: frontmatter.company,
        jobTitle: frontmatter.jobTitle || frontmatter.job_title,
        date: frontmatter.date || new Date(fs.statSync(filePath).mtime).toISOString().split('T')[0],
        filename: file
      });
    }

    // Sort by date (newest first)
    letters.sort((a, b) => new Date(b.date) - new Date(a.date));

    return {
      letters
    };
  } catch (err) {
    console.error('Error loading letters:', err);
    return {
      letters: [],
      error: 'Failed to load letters'
    };
  }
}
