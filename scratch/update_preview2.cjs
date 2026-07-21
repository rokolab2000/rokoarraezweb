const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetPath, 'utf8');

const regex = /document\.addEventListener\('mouseenter',\s*\(e\)\s*=>\s*\{\s*const card = e\.target\.closest\('\.project-card'\);\s*if \(card\) \{/s;

const replacement = `document.addEventListener('mouseenter', (e) => { 
            const card = e.target.closest('.project-card'); 
            if (card) { 
                const container = card.closest('[data-view]');
                const currentView = container ? container.getAttribute('data-view') : (localStorage.getItem('roko_project_view') || 'grid');
                
                // Show hover preview image ONLY in List view mode
                if (currentView !== 'list') return;`;

if (regex.test(html)) {
    html = html.replace(regex, replacement);
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('REPLACED SUCCESSFULLY!');
} else {
    console.log('REGEX DID NOT MATCH');
}
