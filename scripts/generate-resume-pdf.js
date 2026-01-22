import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function main() {
    try {
        // Check if dev server is running
        await fetch('http://localhost:5173', { method: 'HEAD' });
        
        console.log('Generating PDF...');
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        await page.goto('http://localhost:5173/resume/pdf', { waitUntil: 'networkidle0' });
        
        const outputPath = path.join(rootDir, `resume-${new Date().getFullYear()}.pdf`);
        await page.pdf({
            path: outputPath,
            format: 'Letter',
            margin: { top: '0.5in', bottom: '0.5in', left: '0.5in', right: '0.5in' },
            printBackground: false
        });
        
        await browser.close();
        console.log(`✓ PDF: ${outputPath} (${Math.round(fs.statSync(outputPath).size / 1024)}KB)`);
        
    } catch (error) {
        console.error('Error:', error.message || 'Dev server not running. Start with: npm run dev');
        process.exit(1);
    }
}

main();