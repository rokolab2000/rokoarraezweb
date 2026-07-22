const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

const regex = /'crowds':\s*\{\s*title:\s*'Crowds',\s*category:\s*'Diseño UX\/UI',\s*categoryType:\s*'turquoise',/s;

const replacement = `'crowds': {
                title: 'Crowds',
                category: 'Diseño UX/UI',
                categoryType: 'turquoise',
                website: 'https://www.enteldigital.cl/crowds',`;

if (regex.test(html)) {
    html = html.replace(regex, replacement);
    fs.writeFileSync(targetHtml, html, 'utf8');
    console.log('REPLACED CROWDS WEBSITE LINK SUCCESSFULLY!');
} else {
    console.log('REGEX DID NOT MATCH');
}
