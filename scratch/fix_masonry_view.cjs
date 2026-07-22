const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

const masonryFixesCSS = `
/* ═══════════════════════════════════════════════════════════════════
   MASONRY VIEW REPAIR (Clean Multi-column Cards with No Splitting)
   ═══════════════════════════════════════════════════════════════════ */
[data-view="masonry"] .works-page__section,
[data-view="masonry"].category-block__grid,
[data-view="masonry"] .category-block__grid {
    display: block !important;
    column-count: 1 !important;
    column-gap: 32px !important;
}

@media (min-width: 768px) {
    [data-view="masonry"] .works-page__section,
    [data-view="masonry"].category-block__grid,
    [data-view="masonry"] .category-block__grid {
        column-count: 2 !important;
    }
}

@media (min-width: 1024px) {
    [data-view="masonry"] .works-page__section,
    [data-view="masonry"].category-block__grid,
    [data-view="masonry"] .category-block__grid {
        column-count: 3 !important;
    }
}

[data-view="masonry"] .category-block__header,
[data-view="masonry"] .works-page__section-header {
    column-span: all !important;
    grid-column: 1 / -1 !important;
    width: 100% !important;
    margin-bottom: 32px !important;
}

[data-view="masonry"] .project-card {
    break-inside: avoid !important;
    -webkit-column-break-inside: avoid !important;
    page-break-inside: avoid !important;
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    margin-bottom: 32px !important;
    box-sizing: border-box !important;
}

[data-view="masonry"] .project-card__thumb-mobile {
    display: block !important;
    width: 100% !important;
    aspect-ratio: auto !important;
    height: auto !important;
    border-radius: 12px !important;
    overflow: hidden !important;
    margin-bottom: 20px !important;
    order: -1 !important;
}

[data-view="masonry"] .project-card__thumb-mobile img {
    width: 100% !important;
    height: auto !important;
    object-fit: cover !important;
    display: block !important;
}
`;

html = html.replace('</style>', `${masonryFixesCSS}\n</style>`);

fs.writeFileSync(targetHtml, html, 'utf8');
console.log('Successfully applied Masonry View CSS repair!');
