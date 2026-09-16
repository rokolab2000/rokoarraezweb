const fs = require('fs');
const path = require('path');

const targetHtml = path.join(__dirname, '..', 'public', 'roko-portfolio-6.html');
let html = fs.readFileSync(targetHtml, 'utf8');

const ACCESS_KEY = '2756865a-6b31-42a5-b8f8-ef2a6cbf21e7';

// ════════════════════════════════════════════════════════════════
// 1. Replace MAIN contactForm submit listener
// ════════════════════════════════════════════════════════════════
const mainSubmitRegex = /contactForm\?\.addEventListener\('submit',[\s\S]*?resetFormBtn\?\.addEventListener/;

const newMainBlock = `contactForm?.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Honeypot
            const honeypotVal = document.getElementById('formHoneypot')?.value;
            if (honeypotVal) { console.warn('Bot detected.'); return; }

            // CAPTCHA
            const userCaptchaVal = parseInt(document.getElementById('formCaptcha')?.value || '0', 10);
            const errorEl = document.getElementById('captchaError');
            if (userCaptchaVal !== captchaAnswer) {
                if (errorEl) errorEl.style.display = 'block';
                return;
            }
            if (errorEl) errorEl.style.display = 'none';

            const submitBtn = contactForm.querySelector('.form-submit');
            const submitText = submitBtn?.querySelector('.form-submit__text');
            if (submitBtn) submitBtn.disabled = true;
            if (submitText) submitText.textContent = 'Enviando...';

            const name     = document.getElementById('formName')?.value || '';
            const email    = document.getElementById('formEmail')?.value || '';
            const phone    = document.getElementById('formPhone')?.value || '';
            const project  = document.getElementById('formProjectName')?.value || '';
            const interest = document.getElementById('formInterest')?.value || '';
            const priority = document.getElementById('formPriority')?.value || '';
            const website  = document.getElementById('formWebsite')?.value || '';
            const message  = document.getElementById('formMessage')?.value || '';

            const fd = new FormData();
            fd.append('access_key', '${ACCESS_KEY}');
            fd.append('subject',    \`Nuevo contacto de \${name} - rokoarraez.com\`);
            fd.append('from_name',  'rokoarraez.com Formulario de Contacto');
            fd.append('name',     name);
            fd.append('email',    email);
            fd.append('phone',    phone);
            fd.append('project',  project);
            fd.append('interest', interest);
            fd.append('priority', priority);
            fd.append('website',  website);
            fd.append('message',  message);

            try {
                const res = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: fd
                });
                const data = await res.json();
                console.log('Web3Forms:', data);

                if (data.success) {
                    contactForm.style.display = 'none';
                    formSuccess?.classList.add('is-visible');
                } else {
                    if (submitBtn) submitBtn.disabled = false;
                    if (submitText) submitText.textContent = 'Enviar mensaje';
                    alert('No se pudo enviar el mensaje. Por favor escríbenos directamente a luisarraez66@gmail.com');
                }
            } catch (err) {
                console.error('Web3Forms error:', err);
                if (submitBtn) submitBtn.disabled = false;
                if (submitText) submitText.textContent = 'Enviar mensaje';
                alert('Error de red. Por favor escríbenos directamente a luisarraez66@gmail.com');
            }
        });

        resetFormBtn?.addEventListener`;

const mainMatch = mainSubmitRegex.test(html);
if (mainMatch) {
    html = html.replace(mainSubmitRegex, newMainBlock);
    console.log('✅ Main contactForm updated');
} else {
    console.log('❌ Main contactForm regex not matched');
}

// ════════════════════════════════════════════════════════════════
// 2. Replace BIO contactFormBio submit listener
// ════════════════════════════════════════════════════════════════
const bioSubmitRegex = /contactFormBio\?\.addEventListener\('submit',[\s\S]*?resetFormBtnBio\?\.addEventListener/;

const newBioBlock = `contactFormBio?.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Honeypot
            const honeypotVal = document.getElementById('formHoneypotBio')?.value;
            if (honeypotVal) { console.warn('Bot detected.'); return; }

            // CAPTCHA
            const userCaptchaVal = parseInt(document.getElementById('formCaptchaBio')?.value || '0', 10);
            const errorEl = document.getElementById('captchaErrorBio');
            if (userCaptchaVal !== captchaAnswerBio) {
                if (errorEl) errorEl.style.display = 'block';
                return;
            }
            if (errorEl) errorEl.style.display = 'none';

            const submitBtn = contactFormBio.querySelector('.form-submit');
            const submitText = submitBtn?.querySelector('.form-submit__text');
            if (submitBtn) submitBtn.disabled = true;
            if (submitText) submitText.textContent = 'Enviando...';

            const nameBio     = document.getElementById('formNameBio')?.value || '';
            const emailBio    = document.getElementById('formEmailBio')?.value || '';
            const phoneBio    = document.getElementById('formPhoneBio')?.value || '';
            const projectBio  = document.getElementById('formProjectNameBio')?.value || '';
            const interestBio = document.getElementById('formInterestBio')?.value || '';
            const priorityBio = document.getElementById('formPriorityBio')?.value || '';
            const websiteBio  = document.getElementById('formWebsiteBio')?.value || '';
            const messageBio  = document.getElementById('formMessageBio')?.value || '';

            const fd = new FormData();
            fd.append('access_key', '${ACCESS_KEY}');
            fd.append('subject',    \`Nuevo contacto de \${nameBio} - System Bio rokoarraez.com\`);
            fd.append('from_name',  'rokoarraez.com System Bio Form');
            fd.append('name',     nameBio);
            fd.append('email',    emailBio);
            fd.append('phone',    phoneBio);
            fd.append('project',  projectBio);
            fd.append('interest', interestBio);
            fd.append('priority', priorityBio);
            fd.append('website',  websiteBio);
            fd.append('message',  messageBio);

            try {
                const res = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: fd
                });
                const data = await res.json();
                console.log('Web3Forms Bio:', data);

                if (data.success) {
                    contactFormBio.style.display = 'none';
                    formSuccessBio?.classList.add('is-visible');
                } else {
                    if (submitBtn) submitBtn.disabled = false;
                    if (submitText) submitText.textContent = 'Enviar mensaje';
                    alert('No se pudo enviar el mensaje. Por favor escríbenos directamente a luisarraez66@gmail.com');
                }
            } catch (err) {
                console.error('Web3Forms Bio error:', err);
                if (submitBtn) submitBtn.disabled = false;
                if (submitText) submitText.textContent = 'Enviar mensaje';
                alert('Error de red. Por favor escríbenos directamente a luisarraez66@gmail.com');
            }
        });

        resetFormBtnBio?.addEventListener`;

const bioMatch = bioSubmitRegex.test(html);
if (bioMatch) {
    html = html.replace(bioSubmitRegex, newBioBlock);
    console.log('✅ Bio contactFormBio updated');
} else {
    console.log('❌ Bio contactFormBio regex not matched');
}

fs.writeFileSync(targetHtml, html, 'utf8');
console.log('Done.');
