const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

const systemBioCSSPatch = `
/* ═══════════════════════════════════════════════════════════════════
   SYSTEM BIO PAGE & PROFILE GRID (Mode Patch)
   ═══════════════════════════════════════════════════════════════════ */
.bio-page {
    padding-top: 120px;
    padding-bottom: 120px;
    min-height: 100vh;
    background: var(--bg-base);
    transition: background var(--transition-theme);
}

.bio-page__header {
    padding: 0 var(--space-container) 64px;
    border-bottom: 1px solid var(--border-base);
    margin-bottom: 64px;
    transition: border-color var(--transition-theme);
}

.bio-page__label {
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-meta);
    margin-bottom: 16px;
    font-family: var(--font-mono);
}

.bio-page__title {
    font-size: clamp(3rem, 8vw, 8rem);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: -0.03em;
    line-height: 0.9;
    margin-bottom: 24px;
    color: var(--text-primary);
}

.bio-page__desc {
    font-size: 14px;
    color: var(--text-muted);
    max-width: 600px;
    line-height: 1.7;
}

.bio-page__content {
    padding: 0 var(--space-container);
}

.bio-profile-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;
    margin-bottom: 96px;
}

@media (min-width: 1024px) {
    .bio-profile-grid {
        grid-template-columns: 360px 1fr;
        gap: 80px;
        align-items: start;
    }
}

.bio-avatar-container {
    position: relative;
    width: 100%;
    max-width: 360px;
    aspect-ratio: 4 / 5;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid var(--border-base);
    background: var(--bg-surface);
}

.bio-avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.bio-avatar-container:hover .bio-avatar-img {
    transform: scale(1.04);
}

.bio-profile-right {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.bio-section-block {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.bio-section-title {
    font-size: 13px;
    font-family: var(--font-mono);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--purple-light);
    margin: 0;
}

.bio-text {
    font-size: 15px;
    line-height: 1.8;
    color: var(--text-secondary);
    margin: 0;
}

.methodology-tag {
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: var(--turquoise);
    background: rgba(0, 240, 255, 0.05);
    border: 1px solid rgba(0, 240, 255, 0.2);
    border-radius: 20px;
    white-space: nowrap;
    transition: all 0.25s ease;
}

.methodology-tag:hover {
    background: rgba(0, 240, 255, 0.15);
    border-color: var(--turquoise);
    transform: translateY(-2px);
}
`;

html = html.replace('</style>', `${systemBioCSSPatch}\n</style>`);

fs.writeFileSync(targetHtml, html, 'utf8');
console.log('Successfully applied System Bio CSS patch!');
