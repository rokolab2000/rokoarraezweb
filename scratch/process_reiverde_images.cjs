const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\Roko Arraez\\.gemini\\antigravity\\brain\\c2e6f365-d95d-4b13-b01e-0201933322b2';
const tempDir = path.join(brainDir, '.tempmediaStorage');
const publicDir = path.join(__dirname, '..', 'public');

// Find all media__1784676527* files
const files = fs.readdirSync(brainDir).filter(f => f.startsWith('media__178467652'));
console.log('Brain media files:', files);

const imagesMapping = [
    { target: 'reiverde-1.jpg', file: files[0] },
    { target: 'reiverde-2.jpg', file: files[1] },
    { target: 'reiverde-3.jpg', file: files[2] },
    { target: 'reiverde3.jpg', file: files[2] }, // Alias for cover as requested
    { target: 'reiverde-4.jpg', file: files[3] },
    { target: 'reiverde-5.jpg', file: files[4] }
];

imagesMapping.forEach(item => {
    if (item.file) {
        const srcPath = path.join(brainDir, item.file);
        const destPath = path.join(publicDir, item.target);
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${item.file} -> public/${item.target}`);
    }
});
