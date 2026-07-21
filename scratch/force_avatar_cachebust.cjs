const fs = require('fs');
const path = require('path');

const photoSrc = 'C:\\Users\\Roko Arraez\\.gemini\\antigravity\\brain\\c2e6f365-d95d-4b13-b01e-0201933322b2\\media__1784663331643.jpg';
const destJpg = path.join(__dirname, '..', 'public', 'roko_bio_avatar.jpg');
const destWebp = path.join(__dirname, '..', 'public', 'roko_bio_avatar.webp');

fs.copyFileSync(photoSrc, destJpg);
fs.copyFileSync(photoSrc, destWebp);

const targetHtml = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

// Replace image src tags to force cache-busting with new filename
html = html.replace(/src="\/roko_avatar\.webp"/g, 'src="/roko_bio_avatar.jpg?v=2026"');
html = html.replace(/roko_avatar\.jpg/g, 'roko_bio_avatar.jpg?v=2026');
html = html.replace(/roko_avatar\.webp/g, 'roko_bio_avatar.jpg?v=2026');

fs.writeFileSync(targetHtml, html, 'utf8');
console.log('Successfully copied new photo as roko_bio_avatar.jpg and updated roko-portfolio-6.html!');
