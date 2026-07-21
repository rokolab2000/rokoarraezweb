const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetPath, 'utf8');

// 1. Update Escapel JS object
const jsEscapelOld = `'escapel': { 
                title: 'Escapel', 
                category: 'Diseño Gráfico', 
                categoryType: 'purple',`;

const jsEscapelNew = `'escapel': { 
                title: 'Escapel', 
                category: 'Diseño UX/UI', 
                categoryType: 'turquoise',`;

html = html.replace(jsEscapelOld, jsEscapelNew);

// 2. Remove Escapel article from Home Grafico section
const homeGraficoEscapel = `                <article class="project-card" data-cursor="view" data-project="escapel" data-color="purple">
                    <div class="project-card__fill"></div>
                    <div class="project-card__content">
                        <div class="project-card__meta">
                            <span class="project-card__year">2018</span>
                            <span class="project-card__category project-card__category--purple">Diseño Gráfico</span>
                            <span class="project-card__tag">Web / UX/UI</span>
                        </div>
                        <h3 class="project-card__title">Escapel</h3>
                        <p class="project-card__desc">Diseño web UX/UI y banners informativos de marca.</p>
                    </div>
                    <div class="project-card__action"><span>View</span><span class="project-card__arrow">→</span></div>
                </article>`;

html = html.replace(homeGraficoEscapel, '');

// 3. Add Escapel article to Home UX/UI section
const homeUXUISearch = '<h3 class="project-card__title">App Banca Digital</h3>\n                        <p class="project-card__desc">Diseño de experiencia completa para aplicación de banca móvil. 45 pantallas.</p>\n                    </div>\n                    <div class="project-card__action"><span>View</span><span class="project-card__arrow">→</span></div>\n                </article>';

const homeUXUIEscapel = `<h3 class="project-card__title">App Banca Digital</h3>
                        <p class="project-card__desc">Diseño de experiencia completa para aplicación de banca móvil. 45 pantallas.</p>
                    </div>
                    <div class="project-card__action"><span>View</span><span class="project-card__arrow">→</span></div>
                </article>
                <article class="project-card project-card--turquoise" data-cursor="view" data-project="escapel" data-color="turquoise">
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

html = html.replace(homeUXUISearch, homeUXUIEscapel);

// 4. Remove Escapel from Works Grafico section
const worksGraficoEscapel = `                    <article class="project-card scroll-reveal" data-cursor="view" data-project="escapel" data-color="purple"><div class="project-card__fill"></div><div class="project-card__content"><div class="project-card__meta"><span class="project-card__year">2018</span><span class="project-card__category project-card__category--purple">Diseño Gráfico</span></div><h3 class="project-card__title">Escapel</h3><p class="project-card__desc">Diseño web UX/UI y banners informativos de marca.</p></div><div class="project-card__action"><span>View</span><span class="project-card__arrow">→</span></div></article>\n`;

html = html.replace(worksGraficoEscapel, '');

// 5. Add Escapel to Works UX/UI section
const worksUXUISearch = `<article class="project-card project-card--turquoise scroll-reveal" data-cursor="view" data-project="app-banca" data-color="turquoise"><div class="project-card__fill"></div><div class="project-card__content"><div class="project-card__meta"><span class="project-card__year">2024</span><span class="project-card__category project-card__category--turquoise">UX/UI</span></div><h3 class="project-card__title">App Banca Digital</h3><p class="project-card__desc">Diseño de experiencia para banca móvil.</p></div><div class="project-card__action"><span>View</span><span class="project-card__arrow">→</span></div></article>`;

const worksUXUIEscapel = `<article class="project-card project-card--turquoise scroll-reveal" data-cursor="view" data-project="app-banca" data-color="turquoise"><div class="project-card__fill"></div><div class="project-card__content"><div class="project-card__meta"><span class="project-card__year">2024</span><span class="project-card__category project-card__category--turquoise">UX/UI</span></div><h3 class="project-card__title">App Banca Digital</h3><p class="project-card__desc">Diseño de experiencia para banca móvil.</p></div><div class="project-card__action"><span>View</span><span class="project-card__arrow">→</span></div></article>
                    <article class="project-card project-card--turquoise scroll-reveal" data-cursor="view" data-project="escapel" data-color="turquoise"><div class="project-card__fill"></div><div class="project-card__content"><div class="project-card__meta"><span class="project-card__year">2018</span><span class="project-card__category project-card__category--turquoise">Diseño UX/UI</span></div><h3 class="project-card__title">Escapel</h3><p class="project-card__desc">Diseño web UX/UI y banners informativos de marca.</p></div><div class="project-card__action"><span>View</span><span class="project-card__arrow">→</span></div></article>`;

html = html.replace(worksUXUISearch, worksUXUIEscapel);

// 6. Update section counts
html = html.replace('(15 proyectos)', '(14 proyectos)');
html = html.replace('(02 proyectos)', '(03 proyectos)');

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully moved Escapel to UX/UI category!');
