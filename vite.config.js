import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

import { compilerOptions } from './tsconfig.json';

const alias = Object.entries(compilerOptions.paths).reduce((acc, [key, [value]]) => {
  const aliasKey = key.substring(0, key.length - 2);
  const path = value.substring(0, value.length - 2);
  return {
    ...acc,
    // eslint-disable-next-line no-undef
    [aliasKey]: resolve(__dirname, path),
  };
}, {});

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/sass/app.scss', 'resources/js/app.tsx'],
      refresh: true,
    }),
    react(),
    tsconfigPaths(),
  ],
  // resolvers: [
  //   {
  //     alias(path) {
  //       for (const [slug, res] of Object.entries(pathAliasMap)) {
  //         if (path.startsWith(slug)) {
  //           return path.replace(slug, res);
  //         }
  //       }
  //     },
  //   },
  // ],
  resolve: {
    alias,
  },
  server: {
    port: 5173,
    host: true,
    hmr: {
      host: 'localhost',
    },
    watch: {
      usePolling: true,
    },
  },
});
