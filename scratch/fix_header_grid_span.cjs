const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

const headerSpanCSS = `
/* Ensure section headers span full width across grid columns */
.category-block__header,
.works-page__section-header {
    grid-column: 1 / -1 !important;
    width: 100% !important;
    box-sizing: border-box !important;
}
`;

html = html.replace('</style>', `${headerSpanCSS}\n</style>`);

fs.writeFileSync(targetHtml, html, 'utf8');
console.log('Successfully added grid-column: 1 / -1 to category and section headers!');
