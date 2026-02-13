import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf-8'));

// 若 GitHub 倉庫名不同，請改為你的 repo 名稱，例如 '/algorithm/'
const GITHUB_PAGES_BASE = '/algorithm-lab/';

export default defineConfig(({ command }) => ({
  // 本地 dev 用根路徑；建置給 GitHub Pages 時用子路徑
  base: command === 'serve' ? '/' : GITHUB_PAGES_BASE,
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
}));

