const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

// 1. Add 'rei-verde' project JS object
const projectObj = `            'rei-verde': {
                title: 'Yerbamatereiverde.cl',
                category: 'Diseño UX/UI',
                categoryType: 'turquoise',
                website: 'https://yerbamatereiverde.cl',
                client: 'yerbamatereiverde.cl',
                role: 'Diseñador Web / Dirección Creativa',
                year: '2024',
                location: 'Santiago, Chile',
                tags: ['Diseño UX/UI', 'E-commerce', 'Diseño Web', 'HTML/CSS', 'Dirección Creativa'],
                tools: ['Shopify', 'Photoshop', 'Illustrator'],
                previewImage: '/reiverde3.jpg',
                description: 'Diseño de sitio web e-commerce para yerbamatereiverde.cl en Santiago, Chile. Tienda dedicada a la venta de yerba mate importada desde Brasil, aplicando identidad de marca, dirección creativa y estrategia de marketing para optimizar el embudo de ventas y lograr un mayor alcance de clientes.',
                gallery: [
                    { label: '01 / Landing Page & Selección Destacada', alt: 'Vista principal del sitio web con banner de productos, selector de yerba mate y secciones de nutrición.', layout: 'wide', image: '/reiverde-1.jpg' },
                    { label: '02 / Catálogo Completo de Productos', alt: 'Vista de la tienda e-commerce con catálogo de yerbas tradicionales, mates, bombillas y ofertas.', layout: 'wide', image: '/reiverde-2.jpg' },
                    { label: '03 / Preparaciones & Accesorios Materos', alt: 'Sección educativa con recetas de preparación de mate y accesorios seleccionados.', layout: 'wide', image: '/reiverde-3.jpg' },
                    { label: '04 / Página de Contacto & Atenciòn', alt: 'Formulario de contacto corporativo y canales de soporte directo.', layout: 'wide', image: '/reiverde-4.jpg' },
                    { label: '05 / Campaña Promocional & Banner', alt: 'Banner publicitario oficial de lanzamiento de nuevos productos Rei Verde.', layout: 'wide', image: '/reiverde-5.jpg' }
                ]
            },\n`;

if (!html.includes("'rei-verde': {")) {
    html = html.replace("'strigtech': {", `${projectObj}'strigtech': {`);
    console.log('Added rei-verde project object to JS');
}

// 2. Add Home card in data-home-category="uxui" grid
const homeCardHTML = `                <article class="project-card project-card--turquoise" data-cursor="view" data-project="rei-verde" data-color="turquoise">
                    <div class="project-card__fill"></div>
                    <div class="project-card__content">
                        <div class="project-card__meta">
                            <span class="project-card__year">2024</span>
                            <span class="project-card__category project-card__category--turquoise">Diseño UX/UI</span>
                        </div>
                        <h3 class="project-card__title">Yerbamatereiverde.cl</h3>
                        <p class="project-card__desc">Tienda e-commerce de mate importado de Brasil y estrategia de marca.</p>
                    </div>
                    <div class="project-card__action">
                        <span>View</span>
                        <span class="project-card__arrow">→</span>
                    </div>
                </article>\n`;

if (!html.includes('data-project="rei-verde"')) {
    html = html.replace('<article class="project-card project-card--turquoise" data-cursor="view" data-project="strigtech"', `${homeCardHTML}<article class="project-card project-card--turquoise" data-cursor="view" data-project="strigtech"`);
    console.log('Added rei-verde HTML card to Home category block');
}

// 3. Add Works card in #section-uxui
const worksCardHTML = `                    <article class="project-card project-card--turquoise scroll-reveal" data-cursor="view" data-project="rei-verde" data-color="turquoise"><div class="project-card__fill"></div><div class="project-card__content"><div class="project-card__meta"><span class="project-card__year">2024</span><span class="project-card__category project-card__category--turquoise">Diseño UX/UI</span></div><h3 class="project-card__title">Yerbamatereiverde.cl</h3><p class="project-card__desc">Tienda e-commerce de mate importado de Brasil y estrategia de marca.</p></div><div class="project-card__action"><span>View</span><span class="project-card__arrow">→</span></div></article>\n`;

if (!html.includes('data-project="rei-verde" scroll-reveal')) {
    html = html.replace('<article class="project-card project-card--turquoise scroll-reveal" data-cursor="view" data-project="strigtech"', `${worksCardHTML}<article class="project-card project-card--turquoise scroll-reveal" data-cursor="view" data-project="strigtech"`);
    console.log('Added rei-verde HTML card to Works UX/UI section');
}

// 4. Update count badge
html = html.replace('(04 proyectos)', '(05 proyectos)');

fs.writeFileSync(targetHtml, html, 'utf8');
console.log('Rei Verde project successfully added!');
