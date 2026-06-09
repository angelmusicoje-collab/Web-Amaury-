import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://meridiano104.mx',
  integrations: [mdx()],
  build: { format: 'directory' },
});
