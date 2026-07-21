const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetPath, 'utf8');

const target = `document.addEventListener('mouseenter', (e) => { 
            const card = e.target.closest('.project-card'); 
            if (card) {`;

const replacement = `document.addEventListener('mouseenter', (e) => { 
            const card = e.target.closest('.project-card'); 
            if (card) { 
                const container = card.closest('[data-view]');
                const currentView = container ? container.getAttribute('data-view') : (localStorage.getItem('roko_project_view') || 'grid');
                
                // Show hover preview image ONLY in List view mode
                if (currentView !== 'list') return;`;

html = html.replace(target, replacement);

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully updated hover preview logic in roko-portfolio-6.html');
