import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'CanvasEditor',
      fileName: (format) => format === 'iife' ? 'canvas.js' : `canvas.${format}.js`,
      formats: ['iife', 'es']
    },
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: false
  }
});
