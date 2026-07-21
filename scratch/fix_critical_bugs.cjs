const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

const cssAdditions = `
/* ═══════════════════════════════════════════════════════════════════
   CRITICAL LAYOUT FIXES & TOOL TAGS SYSTEM
   ═══════════════════════════════════════════════════════════════════ */
html, body {
    max-width: 100vw;
    overflow-x: hidden;
}

.page, .works-page, .home-page, .bio-page {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
}

.category-block {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
}

/* Tool & Methodology Tags styling for System Bio */
.tool-tags-list {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 10px !important;
    margin-top: 12px !important;
}

.tool-tag {
    display: inline-flex !important;
    align-items: center !important;
    gap: 8px !important;
    padding: 8px 16px !important;
    font-size: 12px !important;
    font-weight: 500 !important;
    letter-spacing: 0.04em !important;
    color: var(--text-primary) !important;
    background: rgba(255, 255, 255, 0.04) !important;
    border: 1px solid var(--border-base) !important;
    border-radius: 20px !important;
    white-space: nowrap !important;
    transition: all 0.25s ease !important;
}

.tool-tag:hover {
    background: rgba(123, 81, 156, 0.15) !important;
    border-color: var(--purple) !important;
    color: var(--purple-light) !important;
    transform: translateY(-2px) !important;
}

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
`;

// Inject before </style>
html = html.replace('</style>', `${cssAdditions}\n</style>`);

fs.writeFileSync(targetHtml, html, 'utf8');
console.log('Successfully injected critical layout fixes and tool tag styles!');
