const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

const target = `'crowds': {
                title: 'Crowds',
                category: 'Diseño UX/UI',
                categoryType: 'turquoise',`;

const replacement = `'crowds': {
                title: 'Crowds',
                category: 'Diseño UX/UI',
                categoryType: 'turquoise',
                website: 'https://www.enteldigital.cl/crowds',`;

if (html.includes(target)) {
    html = html.replace(target, replacement);
    fs.writeFileSync(targetHtml, html, 'utf8');
    console.log('Successfully added website link to Crowds project!');
} else {
    console.log('Target string not found in html');
}
