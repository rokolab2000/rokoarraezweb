const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

const iconFixesCSS = `
/* ═══════════════════════════════════════════════════════════════════
   STRICT ICON SIZING FIX (System Bio & Contact Social Icons Only)
   ═══════════════════════════════════════════════════════════════════ */
.tool-icon {
    width: 16px !important;
    height: 16px !important;
    max-width: 16px !important;
    max-height: 16px !important;
    min-width: 16px !important;
    min-height: 16px !important;
    flex-shrink: 0 !important;
    display: inline-block !important;
    vertical-align: middle !important;
}

.social-icon {
    width: 18px !important;
    height: 18px !important;
    max-width: 18px !important;
    max-height: 18px !important;
    min-width: 18px !important;
    min-height: 18px !important;
    flex-shrink: 0 !important;
    display: inline-block !important;
    vertical-align: middle !important;
}
`;

html = html.replace('</style>', `${iconFixesCSS}\n</style>`);

fs.writeFileSync(targetHtml, html, 'utf8');
console.log('Successfully injected targeted icon sizing fixes without altering any layout structures!');
