const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

const ACCESS_KEY = '2756865a-6b31-42a5-b8f8-ef2a6cbf21e7';

// 1. Add hidden access_key input to contactForm if not present
if (!html.includes('id="web3AccessKey"')) {
    html = html.replace(
        '<form class="contact-form" id="contactForm">',
        `<form class="contact-form" id="contactForm">\n                        <input type="hidden" name="access_key" id="web3AccessKey" value="${ACCESS_KEY}">`
    );
}

// 2. Add hidden access_key input to contactFormBio if not present
if (!html.includes('id="web3AccessKeyBio"')) {
    html = html.replace(
        '<form class="contact-form" id="contactFormBio">',
        `<form class="contact-form" id="contactFormBio">\n                            <input type="hidden" name="access_key" id="web3AccessKeyBio" value="${ACCESS_KEY}">`
    );
}

// 3. Update main contactForm submit listener
const mainSubmitRegex = /contactForm\?\.addEventListener\('submit',[\s\S]*?resetFormBtn\?\.addEventListener/;

const newMainSubmitBlock = `contactForm?.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Honeypot check
            const honeypotVal = document.getElementById('formHoneypot')?.value;
            if (honeypotVal) {
                console.warn('Bot detected via honeypot.');
                return;
            }
            
            // CAPTCHA check
            const userCaptchaVal = parseInt(document.getElementById('formCaptcha')?.value || '0', 10);
            const errorEl = document.getElementById('captchaError');
            if (userCaptchaVal !== captchaAnswer) {
                if (errorEl) errorEl.style.display = 'block';
                return;
            }
            if (errorEl) errorEl.style.display = 'none';

            const submitBtn = contactForm.querySelector('.form-submit');
            const submitText = submitBtn ? submitBtn.querySelector('.form-submit__text') : null;
            const originalBtnText = submitText ? submitText.textContent : 'Enviar mensaje';
            if (submitBtn) submitBtn.disabled = true;
            if (submitText) submitText.textContent = 'Enviando...';

            const name = document.getElementById('formName')?.value || '';
            const email = document.getElementById('formEmail')?.value || '';
            const phone = document.getElementById('formPhone')?.value || '';
            const project = document.getElementById('formProjectName')?.value || '';
            const interest = document.getElementById('formInterest')?.value || '';
            const priority = document.getElementById('formPriority')?.value || '';
            const website = document.getElementById('formWebsite')?.value || '';
            const message = document.getElementById('formMessage')?.value || '';

            const payload = {
                access_key: '${ACCESS_KEY}',
                subject: \`Nuevo contacto de \${name} - rokoarraez.com\`,
                from_name: 'rokoarraez.com Formulario de Contacto',
                name: name,
                email: email,
                phone: phone,
                project: project,
                interest: interest,
                priority: priority,
                website: website,
                message: message
            };

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();
                console.log('Web3Forms response:', result);

                if (result.success) {
                    contactForm.style.display = 'none';
                    formSuccess?.classList.add('is-visible');
                } else {
                    alert('Hubo un detalle al enviar el mensaje: ' + (result.message || 'Intenta de nuevo'));
                    if (submitBtn) submitBtn.disabled = false;
                    if (submitText) submitText.textContent = originalBtnText;
                }
            } catch (err) {
                console.error('Web3Forms error:', err);
                // Fallback mailto if network fails
                const subjectEnc = encodeURIComponent(\`Nuevo mensaje de contacto de \${name} (\${email}) - rokoarraez.com\`);
                const bodyEnc = encodeURIComponent(\`Nombre: \${name}\\nEmail: \${email}\\nTeléfono: \${phone}\\nMensaje:\\n\${message}\`);
                window.location.href = \`mailto:luisarraez66@gmail.com?subject=\${subjectEnc}&body=\${bodyEnc}\`;
                contactForm.style.display = 'none';
                formSuccess?.classList.add('is-visible');
            }
        });

        resetFormBtn?.addEventListener`;

html = html.replace(mainSubmitRegex, newMainSubmitBlock);

// 4. Update bio contactFormBio submit listener
const bioSubmitRegex = /contactFormBio\?\.addEventListener\('submit',[\s\S]*?resetFormBtnBio\?\.addEventListener/;

const newBioSubmitBlock = `contactFormBio?.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Honeypot check
            const honeypotVal = document.getElementById('formHoneypotBio')?.value;
            if (honeypotVal) {
                console.warn('Bot detected via honeypot.');
                return;
            }
            
            // CAPTCHA check
            const userCaptchaVal = parseInt(document.getElementById('formCaptchaBio')?.value || '0', 10);
            const errorEl = document.getElementById('captchaErrorBio');
            if (userCaptchaVal !== captchaAnswerBio) {
                if (errorEl) errorEl.style.display = 'block';
                return;
            }
            if (errorEl) errorEl.style.display = 'none';

            const submitBtn = contactFormBio.querySelector('.form-submit');
            const submitText = submitBtn ? submitBtn.querySelector('.form-submit__text') : null;
            const originalBtnText = submitText ? submitText.textContent : 'Enviar mensaje';
            if (submitBtn) submitBtn.disabled = true;
            if (submitText) submitText.textContent = 'Enviando...';

            const nameBio = document.getElementById('formNameBio')?.value || '';
            const emailBio = document.getElementById('formEmailBio')?.value || '';
            const phoneBio = document.getElementById('formPhoneBio')?.value || '';
            const projectBio = document.getElementById('formProjectNameBio')?.value || '';
            const interestBio = document.getElementById('formInterestBio')?.value || '';
            const priorityBio = document.getElementById('formPriorityBio')?.value || '';
            const websiteBio = document.getElementById('formWebsiteBio')?.value || '';
            const messageBio = document.getElementById('formMessageBio')?.value || '';

            const payloadBio = {
                access_key: '${ACCESS_KEY}',
                subject: \`Nuevo contacto de \${nameBio} - System Bio rokoarraez.com\`,
                from_name: 'rokoarraez.com System Bio Form',
                name: nameBio,
                email: emailBio,
                phone: phoneBio,
                project: projectBio,
                interest: interestBio,
                priority: priorityBio,
                website: websiteBio,
                message: messageBio
            };

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payloadBio)
                });

                const result = await response.json();
                console.log('Web3Forms Bio response:', result);

                if (result.success) {
                    contactFormBio.style.display = 'none';
                    formSuccessBio?.classList.add('is-visible');
                } else {
                    alert('Hubo un detalle al enviar el mensaje: ' + (result.message || 'Intenta de nuevo'));
                    if (submitBtn) submitBtn.disabled = false;
                    if (submitText) submitText.textContent = originalBtnText;
                }
            } catch (err) {
                console.error('Web3Forms Bio error:', err);
                const subjectEnc = encodeURIComponent(\`Nuevo mensaje de contacto de \${nameBio} (\${emailBio}) - rokoarraez.com\`);
                const bodyEnc = encodeURIComponent(\`Nombre: \${nameBio}\\nEmail: \${emailBio}\\nTeléfono: \${phoneBio}\\nMensaje:\\n\${messageBio}\`);
                window.location.href = \`mailto:luisarraez66@gmail.com?subject=\${subjectEnc}&body=\${bodyEnc}\`;
                contactFormBio.style.display = 'none';
                formSuccessBio?.classList.add('is-visible');
            }
        });

        resetFormBtnBio?.addEventListener`;

html = html.replace(bioSubmitRegex, newBioSubmitBlock);

fs.writeFileSync(targetHtml, html, 'utf8');
console.log('Updated both forms with await fetch JSON and error validation');
