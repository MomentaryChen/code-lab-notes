const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'dist');
const src = path.join(dist, 'index.html');
const dest = path.join(dist, '404.html');

if (!fs.existsSync(src)) {
  console.error('dist/index.html 不存在，請先執行 npm run build');
  process.exit(1);
}
fs.copyFileSync(src, dest);
console.log('已複製 index.html → 404.html（供 GitHub Pages SPA 路由使用）');
