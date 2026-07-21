const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetPath, 'utf8');

const regex = /(\$\{galleryHTML\}\s*<\/section>)/;

const ctaSection = `\${galleryHTML}
                    </section>

                    <!-- Marketing & Sales Strategic CTA Section -->
                    <section class="project-detail__cta scroll-reveal" style="margin-top: 64px; margin-bottom: 56px; padding: 48px 36px; background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%), var(--bg-surface); border: 1px solid var(--border-base); border-radius: 20px; text-align: center; box-shadow: 0 16px 40px rgba(0,0,0,0.18); position: relative; overflow: hidden;">
                        <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 240px; height: 2px; background: linear-gradient(90deg, transparent, var(--\${color}), transparent);"></div>
                        <div style="font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--\${color}); font-weight: 700; margin-bottom: 14px;">// AUDITORÍA ESTRATÉGICA & CRECIMIENTO B2B</div>
                        <h2 style="font-size: 26px; font-weight: 700; color: var(--text-primary); margin-bottom: 16px; line-height: 1.3;">¿Quieres impulsar la conversión y el valor visual de tu proyecto?</h2>
                        <p style="font-size: 15px; color: var(--text-muted); margin-bottom: 32px; max-width: 640px; margin-left: auto; margin-right: auto; line-height: 1.6;">Agenda una auditoría gratuita de 30 minutos y descubre las oportunidades con mayor impacto para tu proyecto.</p>
                        <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
                            <a href="mailto:luisarraez66@gmail.com?subject=Agenda%20Auditor%C3%ADa%20Gratuita%20de%2030%20minutos" class="cta-button cta-button--primary" data-cursor="hover" style="display: inline-flex; align-items: center; gap: 8px; padding: 16px 36px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; border-radius: 30px; text-decoration: none;">
                                <span>Agendar Auditoría Gratuita (30 min)</span>
                                <span>↗</span>
                            </a>
                        </div>
                    </section>`;

if (regex.test(html)) {
    html = html.replace(regex, ctaSection);
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Successfully injected project CTA!');
} else {
    console.log('Regex target not found!');
}
