import solid from 'solid-start/vite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules';

export default defineConfig({
  plugins: [solid(), imagetools(), optimizeCssModules()],
});
