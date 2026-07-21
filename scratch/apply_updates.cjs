const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetPath, 'utf8');

// 1. Add Breadcrumbs before <h1> in project detail hero
const heroSearch = '<!-- H1: Título del Proyecto (SEO Friendly) -->';
const breadcrumbs = `<!-- Breadcrumbs -->
                        <div class="project-detail__breadcrumbs" style="margin-bottom: 20px; color: var(--text-muted); font-size: 13px; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.08em; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                            <a href="#" class="breadcrumb-link" data-breadcrumb="home" style="color: var(--text-muted); text-decoration: none;" data-cursor="hover">Home</a>
                            <span style="opacity: 0.4;">/</span>
                            <a href="#" class="breadcrumb-link" data-breadcrumb="works" style="color: var(--text-muted); text-decoration: none;" data-cursor="hover">Proyectos</a>
                            <span style="opacity: 0.4;">/</span>
                            <span style="color: var(--\${color}); font-weight: 700;">\${escapeHTML(project.title)}</span>
                        </div>
                        `;

html = html.replace(heroSearch, `${breadcrumbs}${heroSearch}`);

// 2. Add Marketing CTA after gallery section in project detail
const galleryEndSearch = '${galleryHTML}\n                    </section>';
const ctaBlock = `\${galleryHTML}
                    </section>

                    <!-- Marketing & Sales CTA -->
                    <section class="project-detail__cta scroll-reveal" style="margin-top: 64px; margin-bottom: 48px; padding: 48px 32px; background: var(--bg-surface); border: 1px solid var(--border-base); border-radius: 16px; text-align: center; box-shadow: 0 12px 32px rgba(0,0,0,0.12);">
                        <div style="font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--turquoise); font-weight: 700; margin-bottom: 12px;">// AUDITORÍA ESTRATÉGICA & CRECIMIENTO</div>
                        <h2 style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-bottom: 16px;">¿Listo para elevar tu producto digital?</h2>
                        <p style="font-size: 15px; color: var(--text-muted); margin-bottom: 32px; max-width: 620px; margin-left: auto; margin-right: auto; line-height: 1.6;">Agenda una auditoría gratuita de 30 minutos y descubre las tres oportunidades con mayor impacto para tu proyecto.</p>
                        <a href="mailto:luisarraez66@gmail.com?subject=Auditor%C3%ADa%20gratuita%20de%2030%20minutos" class="cta-button cta-button--primary" data-cursor="hover" style="display: inline-block; padding: 14px 32px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; border-radius: 30px; text-decoration: none;">Agendar Auditoría Gratuita ↗</a>
                    </section>`;

html = html.replace(galleryEndSearch, ctaBlock);

// 3. Add Breadcrumb event listener binding
const btnBindSearch = `container.querySelectorAll('.project-detail__back-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    navigateTo('works');
                });
            });`;

const breadcrumbBind = `${btnBindSearch}

            // Bind breadcrumb clicks
            container.querySelectorAll('.breadcrumb-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetPage = link.getAttribute('data-breadcrumb');
                    if (targetPage) navigateTo(targetPage);
                });
            });`;

html = html.replace(btnBindSearch, breadcrumbBind);

// 4. Remove project JS objects
html = html.replace(/\s*'prism-visual':\s*\{[\s\S]*?\n\s*\},/g, '');
html = html.replace(/\s*'memoria-anual':\s*\{[\s\S]*?\n\s*\},/g, '');
html = html.replace(/\s*'dashboard-analytics':\s*\{[\s\S]*?\n\s*\},/g, '');

// 5. Remove project cards from HTML
html = html.replace(/\s*<article[^>]*data-project="prism-visual"[\s\S]*?<\/article>/g, '');
html = html.replace(/\s*<article[^>]*data-project="memoria-anual"[\s\S]*?<\/article>/g, '');
html = html.replace(/\s*<article[^>]*data-project="dashboard-analytics"[\s\S]*?<\/article>/g, '');

// 6. Update section counts in Works page
html = html.replace('(17 proyectos)', '(15 proyectos)');
html = html.replace('(03 proyectos)', '(02 proyectos)');

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully updated roko-portfolio-6.html');
