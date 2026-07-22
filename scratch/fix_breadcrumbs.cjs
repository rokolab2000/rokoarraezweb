const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

// 1. Update renderProjectDetail breadcrumbs HTML block
const oldBreadcrumbsRegex = /<!-- Breadcrumbs -->[\s\S]*?<div class="project-detail__breadcrumbs"[\s\S]*?<\/div>/;

const newBreadcrumbsCode = `<!-- Breadcrumbs (SEO & Interactive Navigation) -->
                        <nav class="project-detail__breadcrumbs" aria-label="Breadcrumb" style="margin-bottom: 20px;">
                            <ol style="list-style: none; display: flex; align-items: center; gap: 8px; margin: 0; padding: 0; flex-wrap: wrap; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;">
                                <li>
                                    <a href="#" class="breadcrumb-link" data-breadcrumb="home" data-cursor="hover" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s ease;">Home</a>
                                </li>
                                <li style="opacity: 0.3; user-select: none;">/</li>
                                <li>
                                    <a href="#" class="breadcrumb-link" data-breadcrumb="works" data-filter="all" data-cursor="hover" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s ease;">Proyectos</a>
                                </li>
                                <li style="opacity: 0.3; user-select: none;">/</li>
                                <li>
                                    <a href="#" class="breadcrumb-link" data-breadcrumb="works" data-filter="\${color === 'turquoise' ? 'uxui' : 'grafico'}" data-cursor="hover" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s ease;">\${escapeHTML(project.category || (color === 'turquoise' ? 'Diseño UX/UI' : 'Diseño Gráfico'))}</a>
                                </li>
                                <li style="opacity: 0.3; user-select: none;">/</li>
                                <li>
                                    <span class="breadcrumb-current" style="color: var(--\${color}); font-weight: 700;">\${escapeHTML(project.title)}</span>
                                </li>
                            </ol>
                        </nav>`;

if (oldBreadcrumbsRegex.test(html)) {
    html = html.replace(oldBreadcrumbsRegex, newBreadcrumbsCode);
    console.log('Successfully replaced breadcrumbs HTML block in renderProjectDetail');
} else {
    console.log('Regex for old breadcrumbs HTML did not match');
}

// 2. Add Breadcrumb Click Handler to JS if not present
const clickHandlerJS = `
        // Breadcrumbs Click Delegation Handler
        document.body.addEventListener('click', (e) => {
            const breadcrumbLink = e.target.closest('.breadcrumb-link');
            if (breadcrumbLink) {
                e.preventDefault();
                const page = breadcrumbLink.dataset.breadcrumb;
                const filter = breadcrumbLink.dataset.filter || null;
                if (page && typeof navigateTo === 'function') {
                    navigateTo(page, filter);
                }
            }
        });
`;

if (!html.includes("const breadcrumbLink = e.target.closest('.breadcrumb-link')")) {
    html = html.replace("function navigateTo(pageId, filter = null) {", `${clickHandlerJS}\n        function navigateTo(pageId, filter = null) {`);
    console.log('Successfully added breadcrumb click handler to JS');
}

// 3. Add CSS for breadcrumb hover state
const breadcrumbCSS = `
.breadcrumb-link:hover {
    color: var(--text-primary) !important;
    text-decoration: underline !important;
}
`;

html = html.replace('</style>', `${breadcrumbCSS}\n</style>`);

fs.writeFileSync(targetHtml, html, 'utf8');
console.log('Breadcrumbs fix script completed successfully!');
