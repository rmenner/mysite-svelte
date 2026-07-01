import fs from 'fs';
import os from 'os';
import path from 'path';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function main() {
    const args = process.argv.slice(2);
    
    // Parse arguments. --target=<role> selects a resume role variant for the
    // resume/ats channels (e.g. --target=ui-engineer); ignored for letters.
    let type = 'resume';
    let slug = null;
    const targetArg = args.find((a) => a.startsWith('--target='));
    const target = targetArg ? targetArg.split('=')[1] : null;
    const positional = args.filter((a) => !a.startsWith('--'));

    if (positional.length > 0) {
        if (positional[0] === 'ats') {
            type = 'ats';
        } else if (positional[0] === 'letter' || positional[0] === 'letters') {
            type = 'letter';
            slug = positional[1];
            if (!slug) {
                console.error('Usage: node scripts/generate-resume-pdf.js letter <letter-slug>');
                console.error('Example: node scripts/generate-resume-pdf.js letter ramp-2025');
                process.exit(1);
            }
        } else if (positional[0] !== 'resume') {
            // Assume first arg is a letter slug if it's not 'resume'
            type = 'letter';
            slug = positional[0];
        }
    }

    const targetQuery = target ? `?target=${encodeURIComponent(target)}` : '';
    
    try {
        // Check if dev server is running
        await fetch('http://localhost:5173', { method: 'HEAD' });
        
        console.log(`Generating ${type} PDF...`);
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        // Set the PDF generator header for authentication
        await page.setExtraHTTPHeaders({
            'x-pdf-generator': 'internal'
        });
        
        // Determine URL and output path based on type
        let url, outputPath, outputDir;
        
        if (type === 'resume') {
            url = `http://localhost:5173/resume/fancy${targetQuery}`;
            outputPath = path.join(os.homedir(), `resume-${new Date().getFullYear()}.pdf`);
        } else if (type === 'ats') {
            url = `http://localhost:5173/resume/ats${targetQuery}`;
            outputPath = path.join(os.homedir(), `resume-ats-${new Date().getFullYear()}.pdf`);
        } else {
            url = `http://localhost:5173/letters/${slug}/pdf`;
            outputDir = path.join(rootDir, 'letters-pdf');
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }
            outputPath = path.join(outputDir, `${slug}-${new Date().getFullYear()}.pdf`);
        }
        
        await page.goto(url, { waitUntil: 'networkidle0' });
        await page.evaluateHandle('document.fonts.ready');
        
        await page.pdf({
            path: outputPath,
            format: 'Letter',
            margin: (type === 'resume' || type === 'ats')
                ? { top: '0.3in', bottom: '0.3in', left: '0.3in', right: '0.3in' }
                : { top: '0.75in', bottom: '0.75in', left: '0.75in', right: '0.75in' },
            printBackground: true
        });
        
        await browser.close();
        console.log(`✓ PDF: ${outputPath} (${Math.round(fs.statSync(outputPath).size / 1024)}KB)`);
        
    } catch (error) {
        if (error.code === 'ECONNREFUSED' || error.cause?.code === 'ECONNREFUSED') {
            console.error('❌ Error: Development server is not running.');
            console.error('Please start the dev server with: npm run dev');
        } else {
            console.error('❌ Error generating PDF:', error.message);
        }
        process.exit(1);
    }
}

main();
