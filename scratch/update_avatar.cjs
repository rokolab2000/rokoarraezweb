const fs = require('fs');
const path = require('path');

const mediaSrc = 'C:\\Users\\Roko Arraez\\.gemini\\antigravity\\brain\\c2e6f365-d95d-4b13-b01e-0201933322b2\\media__1784663331643.jpg';
const destJpg = path.join(__dirname, '..', 'public', 'roko_avatar.jpg');
const destWebp = path.join(__dirname, '..', 'public', 'roko_avatar.webp');

fs.copyFileSync(mediaSrc, destJpg);
fs.copyFileSync(mediaSrc, destWebp);

console.log('Successfully copied new avatar image to public/roko_avatar.jpg and public/roko_avatar.webp');
