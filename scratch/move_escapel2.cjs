const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetPath, 'utf8');

// 1. Update Escapel JS object
html = html.replace(/'escapel':\s*\{\s*title:\s*'Escapel',\s*category:\s*'Diseño Gráfico',\s*categoryType:\s*'purple',/,
    `'escapel': { \n                title: 'Escapel', \n                category: 'Diseño UX/UI', \n                categoryType: 'turquoise',`);

// 2. Remove Escapel from Home Grafico grid
html = html.replace(/<article class="project-card" data-cursor="view" data-project="escapel" data-color="purple">[\s\S]*?<\/article>\s*/, '');

// 3. Add Escapel to Home UXUI grid if not present
if (!html.includes('data-home-category="uxui"') || !html.includes('data-project="escapel" data-color="turquoise"')) {
    html = html.replace(/(<article class="project-card project-card--turquoise" data-cursor="view" data-project="app-banca"[\s\S]*?<\/article>)/,
        `$1\n                <article class="project-card project-card--turquoise" data-cursor="view" data-project="escapel" data-color="turquoise">\n                    <div class="project-card__fill"></div>\n                    <div class="project-card__content">\n                        <div class="project-card__meta">\n                            <span class="project-card__year">2018</span>\n                            <span class="project-card__category project-card__category--turquoise">Diseño UX/UI</span>\n                            <span class="project-card__tag">Web / UX/UI</span>\n                        </div>\n                        <h3 class="project-card__title">Escapel</h3>\n                        <p class="project-card__desc">Diseño web UX/UI y banners informativos de marca.</p>\n                    </div>\n                    <div class="project-card__action"><span>View</span><span class="project-card__arrow">→</span></div>\n                </article>`);
}

fs.writeFileSync(targetPath, html, 'utf8');
console.log('REPLACED ESCAPEL JS AND HOME GRID SUCCESSFULLY');
