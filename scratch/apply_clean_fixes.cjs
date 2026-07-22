const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const targetHtml = path.join(publicDir, 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

// 1. Add website URL to Crowds project object
if (!html.includes("website: 'https://www.enteldigital.cl/crowds'")) {
    const crowdsPattern = /('crowds':\s*\{[^}]*?categoryType:\s*'turquoise',)/;
    html = html.replace(crowdsPattern, `$1\n                website: 'https://www.enteldigital.cl/crowds',`);
    console.log('Added website URL to Crowds');
}

// 2. Remove /prototipos link from floating nav menu
html = html.replace(/\s*<a href="\/prototipos" class="floating-menu-link" data-cursor="hover">Prototipos<\/a>/g, '');
console.log('Removed /prototipos link');

// 3. Ensure data-view="grid" default on category-block__grid and works-page__section
html = html.replace(/<div class="category-block__grid">/g, '<div class="category-block__grid" data-view="grid">');
html = html.replace(/<section class="works-page__section"([^>]*?)>/g, (match, p1) => {
    if (p1.includes('data-view=')) return match;
    return `<section class="works-page__section"${p1} data-view="grid">`;
});
console.log('Ensured data-view="grid" on containers');

// 4. Append surgical CSS rules before </style>
const cssRules = `
/* ═══════════════════════════════════════════════════════════════════
   SURGICAL CORRECTIONS: Section Header Grid Span & Icon Sizes
   ═══════════════════════════════════════════════════════════════════ */
.category-block__header,
.works-page__section-header {
    grid-column: 1 / -1 !important;
    width: 100% !important;
    box-sizing: border-box !important;
}

.tool-icon {
    width: 16px !important;
    height: 16px !important;
    max-width: 16px !important;
    max-height: 16px !important;
    min-width: 16px !important;
    min-height: 16px !important;
    flex-shrink: 0 !important;
    display: inline-block !important;
    vertical-align: middle !important;
}

.social-icon {
    width: 18px !important;
    height: 18px !important;
    max-width: 18px !important;
    max-height: 18px !important;
    min-width: 18px !important;
    min-height: 18px !important;
    flex-shrink: 0 !important;
    display: inline-block !important;
    vertical-align: middle !important;
}
`;

html = html.replace('</style>', `${cssRules}\n</style>`);

fs.writeFileSync(targetHtml, html, 'utf8');
console.log('Clean surgical fixes applied successfully!');
