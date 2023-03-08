import suid from '@suid/vite-plugin';
import solid from 'solid-start/vite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [suid(), solid(), imagetools()],
});
