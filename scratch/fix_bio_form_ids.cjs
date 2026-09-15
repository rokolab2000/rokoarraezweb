const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

const ACCESS_KEY = '2756865a-6b31-42a5-b8f8-ef2a6cbf21e7';

// Accurate Bio Form submit handler
const bioSectionSearch = `            contactFormBio.style.display = 'none';
            formSuccessBio?.classList.add('is-visible');`;

const bioFormBlock = `            contactFormBio.style.display = 'none';
            formSuccessBio?.classList.add('is-visible');

            // Send via Web3Forms API to luisarraez66@gmail.com
            const nameBio = document.getElementById('formNameBio')?.value || '';
            const emailBio = document.getElementById('formEmailBio')?.value || '';
            const phoneBio = document.getElementById('formPhoneBio')?.value || '';
            const projectBio = document.getElementById('formProjectNameBio')?.value || '';
            const interestBio = document.getElementById('formInterestBio')?.value || '';
            const priorityBio = document.getElementById('formPriorityBio')?.value || '';
            const websiteBio = document.getElementById('formWebsiteBio')?.value || '';
            const messageBio = document.getElementById('formMessageBio')?.value || '';

            const formDataBio = new FormData();
            formDataBio.append('access_key', '${ACCESS_KEY}');
            formDataBio.append('subject', \`Nuevo contacto de \${nameBio} - System Bio rokoarraez.com\`);
            formDataBio.append('from_name', 'rokoarraez.com System Bio Form');
            formDataBio.append('name', nameBio);
            formDataBio.append('email', emailBio);
            formDataBio.append('phone', phoneBio);
            formDataBio.append('project', projectBio);
            formDataBio.append('interest', interestBio);
            formDataBio.append('priority', priorityBio);
            formDataBio.append('website', websiteBio);
            formDataBio.append('message', messageBio);

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

// Replace from contactFormBio submit handler down to resetFormBtnBio
const bioSubmitPattern = /contactFormBio\.style\.display = 'none';\s+formSuccessBio\?\.classList\.add\('is-visible'\);[\s\S]*?(?=\s+resetFormBtnBio\?\.addEventListener)/;

if (bioSubmitPattern.test(html)) {
    html = html.replace(bioSubmitPattern, bioFormBlock + '\n        });\n');
    console.log('✅ Updated Bio Form to correctly read Bio input IDs');
} else {
    console.log('⚠️ Could not match bioSubmitPattern');
}

fs.writeFileSync(targetHtml, html, 'utf8');
