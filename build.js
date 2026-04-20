#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { minify: minifyHtml } = require('html-minifier-terser');
const { minify: minifyJs } = require('terser');

async function main() {
  const srcHtml = fs.readFileSync('src/index.html', 'utf8');
  const srcJs = fs.readFileSync('src/main.js', 'utf8');

  // 1. Extract bi-* class names from source
  const iconPattern = /\bbi-([a-z0-9-]+)/g;
  const icons = new Set();
  for (const source of [srcHtml, srcJs]) {
    let m;
    while ((m = iconPattern.exec(source))) icons.add(m[1]);
  }

  // 2. Generate icons.css from bootstrap-icons package
  const iconsDir = path.join('node_modules', 'bootstrap-icons', 'icons');
  let css =
    '.bi::before{content:"";display:inline-block;width:1em;height:1em;' +
    'background-size:contain;background-repeat:no-repeat;' +
    'background-position:center;vertical-align:-.125em}\n';

  let generated = 0;
  for (const icon of [...icons].sort()) {
    const svgPath = path.join(iconsDir, `${icon}.svg`);
    if (!fs.existsSync(svgPath)) {
      console.warn(`  skip unknown icon: ${icon}`);
      continue;
    }
    const svg = fs
      .readFileSync(svgPath, 'utf8')
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
    const dataUri = `data:image/svg+xml,${encodeURIComponent(svg)}`;
    css += `.bi-${icon}::before{background-image:url("${dataUri}")}\n`;
    generated++;
  }
  fs.writeFileSync('icons.css', css);
  console.log(`icons.css   ${generated} icons, ${css.length} bytes`);

  // 3. Minify main.js
  const minJs = await minifyJs(srcJs, {
    compress: true,
    mangle: true
  });
  fs.writeFileSync('main.js', minJs.code);
  console.log(`main.js     ${srcJs.length} -> ${minJs.code.length} bytes`);

  // 4. Minify index.html (inline CSS + JSON-LD scripts get compacted)
  const minHtml = await minifyHtml(srcHtml, {
    collapseWhitespace: true,
    conservativeCollapse: false,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    decodeEntities: false
  });
  fs.writeFileSync('index.html', minHtml);
  console.log(`index.html  ${srcHtml.length} -> ${minHtml.length} bytes`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
