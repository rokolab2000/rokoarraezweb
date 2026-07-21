const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

// Replace view mode CSS block (from line 1440 to line 1575) with comprehensive grid & card architecture
const oldViewCSSRegex = /\/\* 1\. LIST VIEW STYLES \*\/[\s\S]*?\/\* 3\. MASONRY VIEW STYLES [\s\S]*?\[data-view="masonry"\] \.project-card:hover \{[\s\S]*?transform: translateY\(-4px\);\s*\}/s;

const newViewCSS = `/* ═══════════════════════════════════════════════════════════════════
   UNIFIED CARD & GRID ARCHITECTURE (Grid, List, Masonry)
   ═══════════════════════════════════════════════════════════════════ */

/* Default Grid Layout for Category Blocks & Works Sections */
.works-page__section,
.category-block__grid,
[data-view="grid"] .works-page__section,
[data-view="grid"].category-block__grid,
[data-view="grid"] .category-block__grid,
[data-view="masonry"] .works-page__section,
[data-view="masonry"].category-block__grid,
[data-view="masonry"] .category-block__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    align-items: stretch;
}

@media (min-width: 768px) {
    .works-page__section,
    .category-block__grid,
    [data-view="grid"] .works-page__section,
    [data-view="grid"].category-block__grid,
    [data-view="grid"] .category-block__grid,
    [data-view="masonry"] .works-page__section,
    [data-view="masonry"].category-block__grid,
    [data-view="masonry"] .category-block__grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .works-page__section,
    .category-block__grid,
    [data-view="grid"] .works-page__section,
    [data-view="grid"].category-block__grid,
    [data-view="grid"] .category-block__grid,
    [data-view="masonry"] .works-page__section,
    [data-view="masonry"].category-block__grid,
    [data-view="masonry"] .category-block__grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Default Card Style (Used in Grid & Masonry views) */
.category-block__grid .project-card,
.works-page__section .project-card,
[data-view="grid"] .project-card,
[data-view="masonry"] .project-card {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
    padding: 24px;
    border: 1px solid var(--border-base);
    border-radius: 16px;
    background: var(--bg-surface, rgba(255, 255, 255, 0.02));
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    box-sizing: border-box;
    height: 100%;
    margin-bottom: 0;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.category-block__grid .project-card:hover,
.works-page__section .project-card:hover,
[data-view="grid"] .project-card:hover,
[data-view="masonry"] .project-card:hover {
    transform: translateY(-6px);
    border-color: var(--purple);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
}

.category-block__grid .project-card--turquoise:hover,
.works-page__section .project-card--turquoise:hover,
[data-view="grid"] .project-card--turquoise:hover,
[data-view="masonry"] .project-card--turquoise:hover {
    border-color: var(--turquoise);
}

.category-block__grid .project-card__thumb-mobile,
.works-page__section .project-card__thumb-mobile,
[data-view="grid"] .project-card__thumb-mobile,
[data-view="masonry"] .project-card__thumb-mobile {
    display: block !important;
    width: 100%;
    aspect-ratio: 16 / 9;
    height: auto;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 20px;
    order: -1;
    box-sizing: border-box;
}

.category-block__grid .project-card__thumb-mobile img,
.works-page__section .project-card__thumb-mobile img,
[data-view="grid"] .project-card__thumb-mobile img,
[data-view="masonry"] .project-card__thumb-mobile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
}

.category-block__grid .project-card:hover .project-card__thumb-mobile img,
.works-page__section .project-card:hover .project-card__thumb-mobile img,
[data-view="grid"] .project-card:hover .project-card__thumb-mobile img,
[data-view="masonry"] .project-card:hover .project-card__thumb-mobile img {
    transform: scale(1.05);
}

.category-block__grid .project-card__desc,
.works-page__section .project-card__desc,
[data-view="grid"] .project-card__desc,
[data-view="masonry"] .project-card__desc {
    display: -webkit-box;
    margin-top: 8px;
}

/* LIST VIEW OVERRIDES */
[data-view="list"] .works-page__section,
[data-view="list"].category-block__grid,
[data-view="list"] .category-block__grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 0 !important;
}

[data-view="list"] .project-card {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: 24px 16px !important;
    border: none !important;
    border-bottom: 1px solid var(--border-base) !important;
    border-radius: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
    height: auto !important;
    transform: none !important;
}

[data-view="list"] .project-card:hover {
    background: rgba(255, 255, 255, 0.02) !important;
    padding-left: 24px !important;
    padding-right: 24px !important;
    transform: none !important;
}

[data-view="list"] .project-card__thumb-mobile {
    display: none !important;
}

[data-view="list"] .project-card__desc {
    display: none !important;
}`;

if (oldViewCSSRegex.test(html)) {
    html = html.replace(oldViewCSSRegex, newViewCSS);
    console.log('REPLACED VIEW CSS REGEX MATCH!');
} else {
    console.log('VIEW CSS REGEX DID NOT MATCH, searching alternative string...');
    const startStr = '/* 1. LIST VIEW STYLES */';
    const endStr = 'transform: translateY(-4px);\n        }';
    const startIndex = html.indexOf(startStr);
    const endIndex = html.indexOf(endStr, startIndex);
    if (startIndex !== -1 && endIndex !== -1) {
        html = html.substring(0, startIndex) + newViewCSS + html.substring(endIndex + endStr.length);
        console.log('REPLACED VIEW CSS BY INDEX STRING MATCH!');
    }
}

// Set data-view="grid" default on all category-block__grid and works-page__section tags in HTML
html = html.replace(/<div class="category-block__grid">/g, '<div class="category-block__grid" data-view="grid">');
html = html.replace(/<section class="works-page__section"([^>]*?)>/g, (match, p1) => {
    if (p1.includes('data-view=')) return match;
    return `<section class="works-page__section"${p1} data-view="grid">`;
});

// Update setView JS function to target both classes properly
html = html.replace(/const containers = document\.querySelectorAll\('\.works-page__content, \.category-block__grid'\);/g,
    `const containers = document.querySelectorAll('.works-page__section, .category-block__grid');`);

fs.writeFileSync(targetHtml, html, 'utf8');
console.log('Successfully updated card architecture in roko-portfolio-6.html');
