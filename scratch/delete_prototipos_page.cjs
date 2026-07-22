const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const prototiposHtml = path.join(publicDir, 'prototipos.html');
const prototiposDir = path.join(publicDir, 'prototipos');

// 1. Delete prototipos.html
if (fs.existsSync(prototiposHtml)) {
    fs.unlinkSync(prototiposHtml);
    console.log('Deleted public/prototipos.html');
}

// Delete prototipos directory if it exists
if (fs.existsSync(prototiposDir)) {
    fs.rmSync(prototiposDir, { recursive: true, force: true });
    console.log('Deleted public/prototipos directory');
}

// 2. Remove link from public/roko-portfolio-6.html
const portfolioHtmlPath = path.join(publicDir, 'roko-portfolio-6.html');
let html = fs.readFileSync(portfolioHtmlPath, 'utf8');

html = html.replace(/\s*<a href="\/prototipos" class="floating-menu-link" data-cursor="hover">Prototipos<\/a>/g, '');

fs.writeFileSync(portfolioHtmlPath, html, 'utf8');
console.log('Removed Prototipos link from roko-portfolio-6.html');

// 3. Remove from sitemap.xml if present
const sitemapPath = path.join(publicDir, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
    let sitemap = fs.readFileSync(sitemapPath, 'utf8');
    sitemap = sitemap.replace(/<!-- Prototipos Page -->[\s\S]*?<url>[\s\S]*?<loc>https:\/\/rokoarraez\.com\/prototipos<\/loc>[\s\S]*?<\/url>\s*/g, '');
    sitemap = sitemap.replace(/<url>[\s\S]*?<loc>https:\/\/rokoarraez\.com\/prototipos<\/loc>[\s\S]*?<\/url>\s*/g, '');
    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
    console.log('Removed Prototipos entry from sitemap.xml');
}
