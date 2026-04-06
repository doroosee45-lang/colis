// check-tailwind.js
console.log('Vérification de Tailwind CSS...');

const fs = require('fs');
const path = require('path');

// Vérifier package.json
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const hasTailwind = packageJson.devDependencies?.tailwindcss || packageJson.dependencies?.tailwindcss;
console.log('Tailwind installé:', hasTailwind ? '✅ Oui' : '❌ Non');

// Vérifier tailwind.config.js
const hasConfig = fs.existsSync('./tailwind.config.js');
console.log('tailwind.config.js existe:', hasConfig ? '✅ Oui' : '❌ Non');

// Vérifier postcss.config.js
const hasPostCSS = fs.existsSync('./postcss.config.js');
console.log('postcss.config.js existe:', hasPostCSS ? '✅ Oui' : '❌ Non');

// Vérifier index.css
const indexCss = fs.readFileSync('./src/index.css', 'utf8');
const hasDirectives = indexCss.includes('@tailwind');
console.log('Directives Tailwind dans index.css:', hasDirectives ? '✅ Oui' : '❌ Non');

console.log('\nPour réparer:');
console.log('1. npm install -D tailwindcss postcss autoprefixer');
console.log('2. npx tailwindcss init -p');
console.log('3. Ajouter @tailwind directives dans index.css');