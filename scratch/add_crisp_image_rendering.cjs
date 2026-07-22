const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

const crispCSS = `
/* Ultra-crisp High-Res Image Rendering & Hardware Acceleration */
img.gallery-real-img,
.project-card__thumb-mobile img,
.bio-avatar-img {
    image-rendering: -webkit-optimize-contrast !important;
    image-rendering: crisp-edges !important;
    backface-visibility: hidden !important;
    transform: translateZ(0) !important;
}
`;

if (!html.includes('image-rendering: -webkit-optimize-contrast')) {
    html = html.replace('</style>', `${crispCSS}\n</style>`);
    fs.writeFileSync(targetHtml, html, 'utf8');
    console.log('Successfully added crisp image rendering CSS rules!');
} else {
    console.log('Crisp image rendering CSS rules already present');
}
