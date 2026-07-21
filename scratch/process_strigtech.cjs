const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const brainDir = 'C:\\Users\\Roko Arraez\\.gemini\\antigravity\\brain\\c2e6f365-d95d-4b13-b01e-0201933322b2';
const publicDir = path.join(__dirname, '..', 'public');

const imgMap = [
    { src: 'media__1784669855111.jpg', name: 'strigtech-1' },
    { src: 'media__1784669938716.png', name: 'strigtech-2' },
    { src: 'media__1784669946229.png', name: 'strigtech-3' },
    { src: 'media__1784669962087.png', name: 'strigtech-4' },
    { src: 'media__1784669965552.png', name: 'strigtech-5' }
];

imgMap.forEach(item => {
    const srcPath = path.join(brainDir, item.src);
    const ext = path.extname(item.src);
    const destName = `${item.name}${ext}`;
    const destPath = path.join(publicDir, destName);
    
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${destName}`);
    
    // Also copy as webp for high performance
    const webpPath = path.join(publicDir, `${item.name}.webp`);
    fs.copyFileSync(srcPath, webpPath);
});

console.log('Images successfully processed.');
