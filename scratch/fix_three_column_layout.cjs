const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

// 1. Update default .category-block__grid to 3 columns on desktop
const oldCategoryGridCSS = `        .category-block__grid {
            display: grid;
            grid-template-columns: 1fr;
            column-gap: 40px;
        }
        @media (min-width: 1024px) {
            .category-block__grid {
                grid-template-columns: 1fr 1fr;
            }
            .category-block__grid .project-card {
                padding: 32px 24px;
            }
        }`;

const newCategoryGridCSS = `        .category-block__grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 32px;
        }
        @media (min-width: 768px) {
            .category-block__grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        @media (min-width: 1024px) {
            .category-block__grid {
                grid-template-columns: repeat(3, 1fr);
            }
            .category-block__grid .project-card {
                padding: 32px 24px;
            }
        }`;

html = html.replace(oldCategoryGridCSS, newCategoryGridCSS);

// 2. Update Grid View media queries from 1200px to 1024px for 3 columns
html = html.replace(/@media \(min-width: 1200px\) \{\s*\[data-view="grid"\] \.works-page__section,\s*\[data-view="grid"\]\.category-block__grid,\s*\[data-view="grid"\] \.category-block__grid \{/g,
    '@media (min-width: 1024px) {\n            [data-view="grid"] .works-page__section,\n            [data-view="grid"].category-block__grid,\n            [data-view="grid"] .category-block__grid {');

// 3. Update Masonry View to use CSS Grid repeat(3, 1fr) with align-items: start to prevent vertical column stacking that leaves col 3 blank
const oldMasonryCSS = `        /* 3. MASONRY VIEW STYLES (Dynamic aspect ratio, uncropped) */
        [data-view="masonry"] .works-page__section,
        [data-view="masonry"].category-block__grid,
        [data-view="masonry"] .category-block__grid {
            column-count: 1;
            column-gap: 32px;
            display: block;
        }
        @media (min-width: 768px) {
            [data-view="masonry"] .works-page__section,
            [data-view="masonry"].category-block__grid,
            [data-view="masonry"] .category-block__grid {
                column-count: 2;
            }
        }
        @media (min-width: 1200px) {
            [data-view="masonry"] .works-page__section,
            [data-view="masonry"].category-block__grid,
            [data-view="masonry"] .category-block__grid {
                column-count: 3;
            }
        }`;

const newMasonryCSS = `        /* 3. MASONRY VIEW STYLES (Dynamic aspect ratio, uncropped) */
        [data-view="masonry"] .works-page__section,
        [data-view="masonry"].category-block__grid,
        [data-view="masonry"] .category-block__grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 32px;
            align-items: start;
        }
        @media (min-width: 768px) {
            [data-view="masonry"] .works-page__section,
            [data-view="masonry"].category-block__grid,
            [data-view="masonry"] .category-block__grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        @media (min-width: 1024px) {
            [data-view="masonry"] .works-page__section,
            [data-view="masonry"].category-block__grid,
            [data-view="masonry"] .category-block__grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }`;

html = html.replace(oldMasonryCSS, newMasonryCSS);

// Also remove margin-bottom: 32px on masonry project-card since grid handles gap
html = html.replace(/\[data-view="masonry"\] \.project-card \{\s*break-inside: avoid;\s*display: inline-block;\s*width: 100%;\s*margin-bottom: 32px;/g,
    '[data-view="masonry"] .project-card {\n            display: flex;\n            flex-direction: column;\n            width: 100%;\n            margin-bottom: 0;');

fs.writeFileSync(targetHtml, html, 'utf8');
console.log('Successfully fixed 3-column layout for Diseño UX/UI and all categories!');
