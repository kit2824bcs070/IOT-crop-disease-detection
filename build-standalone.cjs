const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const assetsDir = path.join(distDir, 'assets');

const files = fs.readdirSync(assetsDir);
const cssFile = files.find(f => f.endsWith('.css'));
const jsFile = files.find(f => f.endsWith('.js'));

if (!cssFile || !jsFile) {
  console.error('Could not find CSS or JS bundle in dist/assets');
  process.exit(1);
}

const css = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
const js = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');

const html = `<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI-POWERED SMART CROP HEALTH MONITORING | IoT & Generative AI Dashboard</title>
    <style>
${css}
    </style>
  </head>
  <body class="bg-[#07100a] text-slate-100 antialiased selection:bg-emerald-500 selection:text-black">
    <div id="root"></div>
    <script>
${js}
    </script>
  </body>
</html>`;

const standaloneInDist = path.join(distDir, 'standalone.html');
const standaloneInProject = path.join(__dirname, 'SMART_FARM_DIRECT_CHROME.html');
const standaloneOnDesktop = 'C:\\Users\\Antony\\OneDrive\\Desktop\\SMART_FARM_DIRECT_CHROME.html';

fs.writeFileSync(standaloneInDist, html, 'utf8');
fs.writeFileSync(standaloneInProject, html, 'utf8');
fs.writeFileSync(standaloneOnDesktop, html, 'utf8');

console.log('Created standalone HTML in:');
console.log(' - ' + standaloneInDist);
console.log(' - ' + standaloneInProject);
console.log(' - ' + standaloneOnDesktop);
console.log('Size:', (html.length / 1024).toFixed(1), 'KB');
