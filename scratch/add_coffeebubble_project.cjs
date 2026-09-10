const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

// 1. Add JS project object
const projectObj = `            'coffeebubble': {
                title: 'Coffee & Bubble Tea',
                category: 'Diseño UX/UI',
                categoryType: 'turquoise',
                website: 'https://coffeebubblebr.com/pt/',
                client: 'coffeebubblebr.com/pt/',
                role: 'Diseñador Web / Dirección Creativa',
                year: '2025',
                location: 'Porto Seguro, Brasil',
                tags: ['Diseño UX/UI', 'Landing Page', 'Dirección Creativa', 'HTML/CSS', 'Generación IA'],
                tools: ['WordPress', 'Illustrator', 'Photoshop'],
                previewImage: '/coffeebubble-cover.jpg',
                description: 'Diseño de sitio web informativo para Coffee & Bubble Tea Brasil. Plataforma desarrollada para exhibir el catálogo de productos y bebidas especiales con botones de pedido directo a WhatsApp. El proyecto incluyó dirección creativa comercial, aplicación de IA en la generación de imágenes y el diseño exclusivo de un menú digital para pantallas en sus tiendas físicas.',
                gallery: [
                    { label: '01 / Sitio Web Principal & Catálogo Digital', alt: 'Vista completa de la landing page oficial de Coffee & Bubble Tea Brasil con selector de especialidades.', layout: 'wide', image: '/coffeebubble-1.jpg' },
                    { label: '02 / Menú Digital para Pantallas en Tienda', alt: 'Diseño de menú táctil en alta resolución para exhibición en pantallas de locales físicos.', layout: 'wide', image: '/coffeebubble-2.jpg' },
                    { label: '03 / Carrito Móvil de Eventos & Coctelería', alt: 'Experiencia de marca móvil y carrito de eventos especiales de bubble tea y cócteles.', layout: 'wide', image: '/coffeebubble-3.jpg' }
                ]
            },\n`;

if (!html.includes("'coffeebubble': {")) {
    html = html.replace("'rei-verde': {", `${projectObj}'rei-verde': {`);
    console.log('Added coffeebubble project object to JS');
}

// 2. Add Home card in data-home-category="uxui" grid
const homeCardHTML = `                <article class="project-card project-card--turquoise" data-cursor="view" data-project="coffeebubble" data-color="turquoise">
                    <div class="project-card__fill"></div>
                    <div class="project-card__content">
                        <div class="project-card__meta">
                            <span class="project-card__year">2025</span>
                            <span class="project-card__category project-card__category--turquoise">Diseño UX/UI</span>
                            <span class="project-card__tag">Landing / WhatsApp</span>
                        </div>
                        <h3 class="project-card__title">Coffee & Bubble Tea</h3>
                        <p class="project-card__desc">Sitio web de catálogo con pedidos por WhatsApp y menú digital para pantallas.</p>
                    </div>
                    <div class="project-card__action">
                        <span>View</span>
                        <span class="project-card__arrow">→</span>
                    </div>
                </article>\n`;

if (!html.includes('data-project="coffeebubble"')) {
    html = html.replace('<article class="project-card project-card--turquoise" data-cursor="view" data-project="rei-verde"', `${homeCardHTML}<article class="project-card project-card--turquoise" data-cursor="view" data-project="rei-verde"`);
    console.log('Added coffeebubble HTML card to Home category block');
}

// 3. Add Works card in #section-uxui
const worksCardHTML = `                    <article class="project-card project-card--turquoise scroll-reveal" data-cursor="view" data-project="coffeebubble" data-color="turquoise"><div class="project-card__fill"></div><div class="project-card__content"><div class="project-card__meta"><span class="project-card__year">2025</span><span class="project-card__category project-card__category--turquoise">Diseño UX/UI</span></div><h3 class="project-card__title">Coffee & Bubble Tea</h3><p class="project-card__desc">Sitio web de catálogo con pedidos por WhatsApp y menú digital para pantallas.</p></div><div class="project-card__action"><span>View</span><span class="project-card__arrow">→</span></div></article>\n`;

if (!html.includes('data-project="coffeebubble" scroll-reveal')) {
    html = html.replace('<article class="project-card project-card--turquoise scroll-reveal" data-cursor="view" data-project="rei-verde"', `${worksCardHTML}<article class="project-card project-card--turquoise scroll-reveal" data-cursor="view" data-project="rei-verde"`);
    console.log('Added coffeebubble HTML card to Works UX/UI section');
}

// 4. Update count badge
html = html.replace('(05 proyectos)', '(06 proyectos)');

fs.writeFileSync(targetHtml, html, 'utf8');
console.log('Coffee & Bubble Tea project successfully added!');
