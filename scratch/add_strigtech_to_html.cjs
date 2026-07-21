const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

// 1. Add JS object right before 'escapel'
const strigtechJS = `            'strigtech': { 
                title: 'Strigtech', 
                category: 'Diseño UX/UI', 
                categoryType: 'turquoise', 
                website: 'https://strigtech.com',
                client: 'Strigtech.com', 
                role: 'Diseñador Web & Dirección Creativa', 
                year: '2025', 
                location: 'Barquisimeto - Venezuela',
                tags: ['Diseño UX/UI', 'E-commerce', 'Diseño Web', 'Dirección Creativa'], 
                tools: ['WordPress', 'Photoshop', 'Illustrator', 'HTML', 'CSS'],
                previewImage: '/strigtech-1.jpg',
                description: 'Diseño de página web para tienda e-commerce B2B de productos tecnológicos al mayor, estructurada con sistema de cotización por producto. En esta oportunidad el sitio se diseñó respetando y potenciando el manual de marca existente, creando una nueva arquitectura de información, una navegación altamente intuitiva y un ecosistema estético llamativo que maximiza la conversión a través del funnel de ventas mayorista.', 
                gallery: [
                    { label: '01 / Homepage - E-commerce Mayorista', alt: 'Diseño de página principal de Strigtech con héroe interactivo de audífonos gamers y grilla de categorías.', layout: 'wide', image: '/strigtech-1.jpg' }, 
                    { label: '02 / Catálogo de Productos y Filtros', alt: 'Catálogo de periféricos y componentes tecnológicos con filtros por categoría y ordenamiento.', layout: 'wide', image: '/strigtech-2.png' },
                    { label: '03 / Ficha de Producto y Cotización B2B', alt: 'Ficha técnica de producto con especificaciones, galería de imágenes y botón de Presupuesto al Mayor.', layout: 'wide', image: '/strigtech-3.png' },
                    { label: '04 / Sección de Garantía y Políticas', alt: 'Interfaz de políticas de garantía y formulario para clientes y distribuidores.', layout: 'wide', image: '/strigtech-4.png' },
                    { label: '05 / Geointeligencia y Distribuidores', alt: 'Mapa interactivo de distribuidores aliados en Venezuela con filtrado por ciudades.', layout: 'wide', image: '/strigtech-5.png' }
                ] 
            },
`;

html = html.replace(/'escapel':\s*\{/, `${strigtechJS}            'escapel': {`);

// 2. Add card to Home UXUI grid
const homeCard = `                <article class="project-card project-card--turquoise" data-cursor="view" data-project="strigtech" data-color="turquoise">
                    <div class="project-card__fill"></div>
                    <div class="project-card__content">
                        <div class="project-card__meta">
                            <span class="project-card__year">2025</span>
                            <span class="project-card__category project-card__category--turquoise">Diseño UX/UI</span>
                            <span class="project-card__tag">E-commerce B2B</span>
                        </div>
                        <h3 class="project-card__title">Strigtech</h3>
                        <p class="project-card__desc">Plataforma e-commerce B2B de tecnología y sistema de cotización mayorista.</p>
                    </div>
                    <div class="project-card__action"><span>View</span><span class="project-card__arrow">→</span></div>
                </article>
`;

html = html.replace(/(<article class="project-card project-card--turquoise" data-cursor="view" data-project="crowds" data-color="turquoise">)/, `${homeCard}                $1`);

// 3. Add card to Works UXUI grid section
const worksCard = `                    <article class="project-card project-card--turquoise scroll-reveal" data-cursor="view" data-project="strigtech" data-color="turquoise"><div class="project-card__fill"></div><div class="project-card__content"><div class="project-card__meta"><span class="project-card__year">2025</span><span class="project-card__category project-card__category--turquoise">Diseño UX/UI</span></div><h3 class="project-card__title">Strigtech</h3><p class="project-card__desc">Plataforma e-commerce B2B de tecnología y sistema de cotización mayorista.</p></div><div class="project-card__action"><span>View</span><span class="project-card__arrow">→</span></div></article>\n`;

html = html.replace(/(<article class="project-card project-card--turquoise scroll-reveal" data-cursor="view" data-project="crowds" data-color="turquoise">)/, `${worksCard}$1`);

// 4. Update section badge count
html = html.replace('(03 proyectos)', '(04 proyectos)');

fs.writeFileSync(targetHtml, html, 'utf8');
console.log('Strigtech project successfully added to HTML!');
