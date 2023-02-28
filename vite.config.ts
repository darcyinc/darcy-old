import solid from 'solid-start/vite';
import { defineConfig } from 'vite';
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules';

export default defineConfig({
  plugins: [solid(), optimizeCssModules()],
});
