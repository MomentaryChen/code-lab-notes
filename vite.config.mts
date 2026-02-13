import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// 若 GitHub 倉庫名不同，請改為你的 repo 名稱，例如 '/algorithm/'
const BASE = '/algorithm-lab/';

export default defineConfig({
  base: BASE,
  plugins: [react()],
});

