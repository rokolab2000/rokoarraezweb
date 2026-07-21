const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

// 1. Remove Escapel from section-grafico
const oldGraficoEscapel = `<article class="project-card scroll-reveal" data-cursor="view" data-project="escapel" data-color="purple"><div class="project-card__fill"></div><div class="project-card__content"><div class="project-card__meta"><span class="project-card__year">2018</span><span class="project-card__category project-card__category--purple">Diseño Gráfico</span></div><h3 class="project-card__title">Escapel</h3><p class="project-card__desc">Diseño web UX/UI y banners informativos de marca.</p></div><div class="project-card__action"><span>View</span><span class="project-card__arrow">→</span></div></article>\n`;

html = html.replace(oldGraficoEscapel, '');

// 2. Update Grafik section count to (13 proyectos)
html = html.replace('(14 proyectos)', '(13 proyectos)');

// 3. Ensure Escapel card is in Home Page UX/UI grid
const homeUXUICard = `                <article class="project-card project-card--turquoise" data-cursor="view" data-project="escapel" data-color="turquoise">
                    <div class="project-card__fill"></div>
                    <div class="project-card__content">
                        <div class="project-card__meta">
                            <span class="project-card__year">2018</span>
                            <span class="project-card__category project-card__category--turquoise">Diseño UX/UI</span>
                            <span class="project-card__tag">Web / UX/UI</span>
                        </div>
                        <h3 class="project-card__title">Escapel</h3>
                        <p class="project-card__desc">Diseño web UX/UI y banners informativos de marca.</p>
                    </div>
                    <div class="project-card__action"><span>View</span><span class="project-card__arrow">→</span></div>
                </article>`;

if (!html.includes('data-project="escapel" data-color="turquoise" class="project-card project-card--turquoise"')) {
    html = html.replace(/(<article class="project-card project-card--turquoise" data-cursor="view" data-project="app-banca"[\s\S]*?<\/article>)/, `$1\n${homeUXUICard}`);
}

fs.writeFileSync(targetHtml, html, 'utf8');
console.log('Successfully fixed Escapel placement in UX/UI category!');
