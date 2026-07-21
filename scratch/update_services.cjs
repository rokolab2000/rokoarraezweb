const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetPath, 'utf8');

// 1. Add CSS for service-row__cta
const cssTarget = '.service-row--purple:hover .service-row__price { color: var(--purple); }';
const newCSS = `.service-row--purple:hover .service-row__price { color: var(--purple); }

        .service-row__cta { 
            font-size: 11px; 
            font-family: var(--font-mono); 
            font-weight: 700; 
            text-transform: uppercase; 
            letter-spacing: 0.08em; 
            color: var(--text-primary); 
            position: relative; 
            z-index: 2; 
            padding: 6px 14px; 
            border-radius: 20px; 
            border: 1px solid var(--border-base); 
            background: var(--bg-surface); 
            text-decoration: none; 
            transition: all 0.25s ease; 
            display: inline-flex; 
            align-items: center; 
            gap: 4px;
        }
        .service-row--turquoise:hover .service-row__cta { 
            border-color: var(--turquoise); 
            color: #0b0b12; 
            background: var(--turquoise); 
            box-shadow: 0 4px 12px rgba(0, 169, 180, 0.3);
        }
        .service-row--purple:hover .service-row__cta { 
            border-color: var(--purple); 
            color: #ffffff; 
            background: var(--purple); 
            box-shadow: 0 4px 12px rgba(123, 81, 156, 0.3);
        }`;

html = html.replace(cssTarget, newCSS);

// 2. Replace prices with CTA buttons in HTML
const serviceWebHTML = `<div class="services-column__header">
                        <div class="services-column__dot services-column__dot--turquoise"></div>
                        <span class="services-column__name">_Servicios_Web</span>
                    </div>
                    <div class="service-row service-row--turquoise" data-cursor="hover"><div class="service-row__fill"></div><span class="service-row__number">01</span><span class="service-row__name">Landing Page</span><a href="mailto:luisarraez66@gmail.com?subject=Solicitud%20de%20Servicio%3A%20Landing%20Page" class="service-row__cta" data-cursor="hover">Solicitar Servicio ↗</a></div>
                    <div class="service-row service-row--turquoise" data-cursor="hover"><div class="service-row__fill"></div><span class="service-row__number">02</span><span class="service-row__name">Ecommerce</span><a href="mailto:luisarraez66@gmail.com?subject=Solicitud%20de%20Servicio%3A%20Ecommerce" class="service-row__cta" data-cursor="hover">Solicitar Servicio ↗</a></div>
                    <div class="service-row service-row--turquoise" data-cursor="hover"><div class="service-row__fill"></div><span class="service-row__number">03</span><span class="service-row__name">Dashboard UI</span><a href="mailto:luisarraez66@gmail.com?subject=Solicitud%20de%20Servicio%3A%20Dashboard%20UI" class="service-row__cta" data-cursor="hover">Solicitar Servicio ↗</a></div>
                    <div class="service-row service-row--turquoise" data-cursor="hover"><div class="service-row__fill"></div><span class="service-row__number">04</span><span class="service-row__name">Design System</span><a href="mailto:luisarraez66@gmail.com?subject=Solicitud%20de%20Servicio%3A%20Design%20System" class="service-row__cta" data-cursor="hover">Solicitar Servicio ↗</a></div>`;

const serviceWebSearch = html.match(/<div class="services-column__header">[\s\S]*?_Servicios_Web[\s\S]*?<\/div>\s*<div class="service-row service-row--turquoise"[\s\S]*?<div class="service-row service-row--turquoise"[\s\S]*?<\/div>/);

html = html.replace(/<div class="service-row service-row--turquoise" data-cursor="hover"><div class="service-row__fill"><\/div><span class="service-row__number">01<\/span><span class="service-row__name">Landing Page<\/span><span class="service-row__price">\$100\.000\+<\/span><\/div>/,
    '<div class="service-row service-row--turquoise" data-cursor="hover"><div class="service-row__fill"></div><span class="service-row__number">01</span><span class="service-row__name">Landing Page</span><a href="mailto:luisarraez66@gmail.com?subject=Solicitud%20de%20Servicio%3A%20Landing%20Page" class="service-row__cta" data-cursor="hover">Solicitar Servicio ↗</a></div>');

html = html.replace(/<div class="service-row service-row--turquoise" data-cursor="hover"><div class="service-row__fill"><\/div><span class="service-row__number">02<\/span><span class="service-row__name">Ecommerce<\/span><span class="service-row__price">Custom<\/span><\/div>/,
    '<div class="service-row service-row--turquoise" data-cursor="hover"><div class="service-row__fill"></div><span class="service-row__number">02</span><span class="service-row__name">Ecommerce</span><a href="mailto:luisarraez66@gmail.com?subject=Solicitud%20de%20Servicio%3A%20Ecommerce" class="service-row__cta" data-cursor="hover">Solicitar Servicio ↗</a></div>');

html = html.replace(/<div class="service-row service-row--turquoise" data-cursor="hover"><div class="service-row__fill"><\/div><span class="service-row__number">03<\/span><span class="service-row__name">Dashboard UI<\/span><span class="service-row__price">Custom<\/span><\/div>/,
    '<div class="service-row service-row--turquoise" data-cursor="hover"><div class="service-row__fill"></div><span class="service-row__number">03</span><span class="service-row__name">Dashboard UI</span><a href="mailto:luisarraez66@gmail.com?subject=Solicitud%20de%20Servicio%3A%20Dashboard%20UI" class="service-row__cta" data-cursor="hover">Solicitar Servicio ↗</a></div>');

html = html.replace(/<div class="service-row service-row--turquoise" data-cursor="hover"><div class="service-row__fill"><\/div><span class="service-row__number">04<\/span><span class="service-row__name">Design System<\/span><span class="service-row__price">Custom<\/span><\/div>/,
    '<div class="service-row service-row--turquoise" data-cursor="hover"><div class="service-row__fill"></div><span class="service-row__number">04</span><span class="service-row__name">Design System</span><a href="mailto:luisarraez66@gmail.com?subject=Solicitud%20de%20Servicio%3A%20Design%20System" class="service-row__cta" data-cursor="hover">Solicitar Servicio ↗</a></div>');

// Branding
html = html.replace(/<div class="service-row service-row--purple" data-cursor="hover"><div class="service-row__fill"><\/div><span class="service-row__number">01<\/span><span class="service-row__name">Plan Básico<\/span><span class="service-row__price">\$50<\/span><\/div>/,
    '<div class="service-row service-row--purple" data-cursor="hover"><div class="service-row__fill"></div><span class="service-row__number">01</span><span class="service-row__name">Plan Básico</span><a href="mailto:luisarraez66@gmail.com?subject=Solicitud%20de%20Servicio%3A%20Plan%20B%C3%A1sico%20Branding" class="service-row__cta" data-cursor="hover">Solicitar Servicio ↗</a></div>');

html = html.replace(/<div class="service-row service-row--purple" data-cursor="hover"><div class="service-row__fill"><\/div><span class="service-row__number">02<\/span><span class="service-row__name">Plan Full<\/span><span class="service-row__price">\$100<\/span><\/div>/,
    '<div class="service-row service-row--purple" data-cursor="hover"><div class="service-row__fill"></div><span class="service-row__number">02</span><span class="service-row__name">Plan Full</span><a href="mailto:luisarraez66@gmail.com?subject=Solicitud%20de%20Servicio%3A%20Plan%20Full%20Branding" class="service-row__cta" data-cursor="hover">Solicitar Servicio ↗</a></div>');

html = html.replace(/<div class="service-row service-row--purple" data-cursor="hover"><div class="service-row__fill"><\/div><span class="service-row__number">03<\/span><span class="service-row__name">Brand Book<\/span><span class="service-row__price">\$150<\/span><\/div>/,
    '<div class="service-row service-row--purple" data-cursor="hover"><div class="service-row__fill"></div><span class="service-row__number">03</span><span class="service-row__name">Brand Book</span><a href="mailto:luisarraez66@gmail.com?subject=Solicitud%20de%20Servicio%3A%20Brand%20Book" class="service-row__cta" data-cursor="hover">Solicitar Servicio ↗</a></div>');

html = html.replace(/<div class="service-row service-row--purple" data-cursor="hover"><div class="service-row__fill"><\/div><span class="service-row__number">04<\/span><span class="service-row__name">Identidad Visual<\/span><span class="service-row__price">Custom<\/span><\/div>/,
    '<div class="service-row service-row--purple" data-cursor="hover"><div class="service-row__fill"></div><span class="service-row__number">04</span><span class="service-row__name">Identidad Visual</span><a href="mailto:luisarraez66@gmail.com?subject=Solicitud%20de%20Servicio%3A%20Identidad%20Visual" class="service-row__cta" data-cursor="hover">Solicitar Servicio ↗</a></div>');

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully updated service rows in roko-portfolio-6.html');
