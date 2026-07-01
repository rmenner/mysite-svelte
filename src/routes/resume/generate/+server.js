import { error } from '@sveltejs/kit';

// Localhost-only endpoint that renders a print route to a PDF with Puppeteer and
// streams it back as a download. Mirrors scripts/generate-resume-pdf.js, but driven
// from a button on the resume page. Never functions off localhost (Puppeteer is a
// dev dependency and the guard below 403s any non-local host), so it is safe to ship.
export async function GET({ url }) {
  const isLocal = ['localhost', '127.0.0.1', '::1'].includes(url.hostname);
  if (!isLocal) {
    throw error(403, 'PDF generation is only available on localhost');
  }

  const channel = url.searchParams.get('channel') === 'ats' ? 'ats' : 'fancy';
  const target = url.searchParams.get('target');
  const route = channel === 'ats' ? '/resume/ats' : '/resume/fancy';
  const query = target ? `?target=${encodeURIComponent(target)}` : '';
  const pageUrl = `${url.origin}${route}${query}`;

  // Dynamic + vite-ignored so Puppeteer is never bundled for production.
  const { default: puppeteer } = await import(/* @vite-ignore */ 'puppeteer');
  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({ 'x-pdf-generator': 'internal' });
    await page.goto(pageUrl, { waitUntil: 'networkidle0' });
    await page.evaluateHandle('document.fonts.ready');
    const pdf = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: { top: '0.3in', bottom: '0.3in', left: '0.3in', right: '0.3in' }
    });

    const filename = `resume-${channel}-${new Date().getFullYear()}.pdf`;
    return new Response(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });
  } finally {
    await browser.close();
  }
}
