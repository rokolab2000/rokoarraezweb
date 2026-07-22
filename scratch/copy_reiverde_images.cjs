const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\Roko Arraez\\.gemini\\antigravity\\brain\\c2e6f365-d95d-4b13-b01e-0201933322b2';
const publicDir = path.join(__dirname, '..', 'public');

const mapping = [
    { src: 'media__1784700153482.jpg', dest: 'reiverde-1.jpg' },
    { src: 'media__1784700185545.jpg', dest: 'reiverde-2.jpg' },
    { src: 'media__1784700198950.jpg', dest: 'reiverde-3.jpg' },
    { src: 'media__1784700198950.jpg', dest: 'reiverde3.jpg' }, // Cover requested by user
    { src: 'media__1784700211241.jpg', dest: 'reiverde-4.jpg' },
    { src: 'media__1784700322628.jpg', dest: 'reiverde-5.jpg' }
];

mapping.forEach(item => {
    const srcPath = path.join(brainDir, item.src);
    const destPath = path.join(publicDir, item.dest);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Successfully copied ${item.src} -> public/${item.dest}`);
    } else {
        console.log(`File not found: ${item.src}`);
    }
});
