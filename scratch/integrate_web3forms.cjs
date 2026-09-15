const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

const ACCESS_KEY = '2756865a-6b31-42a5-b8f8-ef2a6cbf21e7';

// ═══════════════════════════════════════════════════
// 1. Replace main contactForm submit handler
// ═══════════════════════════════════════════════════
const oldMainFormSubmit = `            // Send mailto fallback to luisarraez66@gmail.com
            const name = document.getElementById('formName')?.value || '';
            const email = document.getElementById('formEmail')?.value || '';
            const message = document.getElementById('formMessage')?.value || '';
            const subject = encodeURIComponent(\`Nuevo mensaje de contacto de \${name} (\${email}) - rokoarraez.com\`);
            const body = encodeURIComponent(\`Nombre: \${name}\\nEmail: \${email}\\nMensaje:\\n\${message}\`);
            setTimeout(() => {
                window.location.href = \`mailto:luisarraez66@gmail.com?subject=\${subject}&body=\${body}\`;
            }, 800);`;

const newMainFormSubmit = `            // Send via Web3Forms API to luisarraez66@gmail.com
            const name = document.getElementById('formName')?.value || '';
            const email = document.getElementById('formEmail')?.value || '';
            const phone = document.getElementById('formPhone')?.value || '';
            const project = document.getElementById('formProjectName')?.value || '';
            const interest = document.getElementById('formInterest')?.value || '';
            const priority = document.getElementById('formPriority')?.value || '';
            const website = document.getElementById('formWebsite')?.value || '';
            const message = document.getElementById('formMessage')?.value || '';

            const formData = new FormData();
            formData.append('access_key', '${ACCESS_KEY}');
            formData.append('subject', \`Nuevo contacto de \${name} - rokoarraez.com\`);
            formData.append('from_name', 'rokoarraez.com Formulario de Contacto');
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('project', project);
            formData.append('interest', interest);
            formData.append('priority', priority);
            formData.append('website', website);
            formData.append('message', message);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                console.log('Web3Forms response:', data);
            })
            .catch(err => {
                console.error('Web3Forms error:', err);
            });`;

if (html.includes('Send mailto fallback to luisarraez66@gmail.com\n            const name = document.getElementById(\'formName\')')) {
    html = html.replace(oldMainFormSubmit, newMainFormSubmit);
    console.log('✅ Replaced main contactForm submit handler with Web3Forms');
} else {
    // Try regex approach
    const mainFormRegex = /\/\/ Send mailto fallback to luisarraez66@gmail\.com\s+const name = document\.getElementById\('formName'\)\?\.value[^;]+;\s+const email = document\.getElementById\('formEmail'\)\?\.value[^;]+;\s+const message = document\.getElementById\('formMessage'\)\?\.value[^;]+;\s+const subject = encodeURIComponent[^;]+;\s+const body = encodeURIComponent[^;]+;\s+setTimeout\(\(\) => \{\s+window\.location\.href = `mailto:luisarraez66@gmail\.com\?subject=\$\{subject\}&body=\$\{body\}`;\s+\}, 800\);/;

    if (mainFormRegex.test(html)) {
        html = html.replace(mainFormRegex, newMainFormSubmit);
        console.log('✅ Replaced main contactForm (regex match)');
    } else {
        console.log('⚠️ Main form regex did not match - trying manual replacement...');
        // Find line 5181 area and replace the mailto block
        const mailtoMain = `window.location.href = \`mailto:luisarraez66@gmail.com?subject=\${subject}&body=\${body}\`;\n            }, 800);`;
        if (html.includes("window.location.href = `mailto:luisarraez66@gmail.com")) {
            console.log('Found mailto references - will patch individually');
        }
    }
}

// ═══════════════════════════════════════════════════
// 2. Replace bio contactFormBio submit handler
// ═══════════════════════════════════════════════════
const oldBioFormSubmit = `            // Send mailto fallback to luisarraez66@gmail.com
            const subject = encodeURIComponent(\`Nuevo mensaje de contacto de \${name} (\${email}) - rokoarraez.com\`);
            const body = encodeURIComponent(\`Nombre: \${name}\\nEmail: \${email}\\nMensaje:\\n\${message}\`);
            setTimeout(() => {
                window.location.href = \`mailto:luisarraez66@gmail.com?subject=\${subject}&body=\${body}\`;
            }, 800);`;

const newBioFormSubmit = `            // Send via Web3Forms API to luisarraez66@gmail.com
            const formDataBio = new FormData();
            formDataBio.append('access_key', '${ACCESS_KEY}');
            formDataBio.append('subject', \`Nuevo contacto de \${name} - System Bio rokoarraez.com\`);
            formDataBio.append('from_name', 'rokoarraez.com System Bio Form');
            formDataBio.append('name', name);
            formDataBio.append('email', email);
            formDataBio.append('phone', phone);
            formDataBio.append('project', project);
            formDataBio.append('interest', interest);
            formDataBio.append('priority', priority);
            formDataBio.append('website', website);
            formDataBio.append('message', message);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formDataBio
            })
            .then(res => res.json())
            .then(data => {
                console.log('Web3Forms Bio response:', data);
            })
            .catch(err => {
                console.error('Web3Forms Bio error:', err);
            });`;

// Count occurrences of mailto in the file
const mailtoCount = (html.match(/mailto:luisarraez66@gmail\.com/g) || []).length;
console.log(`Found ${mailtoCount} mailto: references`);

// Replace all remaining mailto references with Web3Forms calls (both forms)
// Split by the two different submit handlers by context
const allMailtoPattern = /\/\/ Send mailto fallback to luisarraez66@gmail\.com[\s\S]*?window\.location\.href = `mailto:luisarraez66@gmail\.com[^`]+`;\s*\}, 800\);/g;
let matchCount = 0;
html = html.replace(allMailtoPattern, (match) => {
    matchCount++;
    if (matchCount === 1) {
        return newMainFormSubmit;
    } else {
        return newBioFormSubmit;
    }
});

console.log(`✅ Replaced ${matchCount} mailto handler(s) with Web3Forms`);

fs.writeFileSync(targetHtml, html, 'utf8');
console.log('✅ Web3Forms integration complete!');
