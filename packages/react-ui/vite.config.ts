// /// <reference types='vitest' />
// import path from 'path';

// import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
// import react from '@vitejs/plugin-react';
// import { defineConfig } from 'vite';
// import checker from 'vite-plugin-checker';

// export default defineConfig({
//   root: __dirname,
//   cacheDir: '../../node_modules/.vite/packages/react-ui',

//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://127.0.0.1:3000',
//         secure: false,
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//         headers: {
//           Host: '127.0.0.1:4200',
//         },
//         ws: true,
//       },
//     },
//     port: 4200,
//     host: '0.0.0.0',
//   },

//   preview: {
//     port: 4300,
//     host: 'localhost',
//   },
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//       '@activepieces/shared': path.resolve(
//         __dirname,
//         '../../packages/shared/src',
//       ),
//       'ee-embed-sdk': path.resolve(
//         __dirname,
//         '../../packages/ee/ui/embed-sdk/src',
//       ),
//       '@activepieces/ee-shared': path.resolve(
//         __dirname,
//         '../../packages/ee/shared/src',
//       ),
//       '@activepieces/pieces-framework': path.resolve(
//         __dirname,
//         '../../packages/pieces/community/framework/src',
//       ),
//     },
//   },
//   plugins: [
//     react(),
//     nxViteTsPaths(),
//     checker({
//       typescript: true,
//     }),
//   ],

//   build: {
//     outDir: '../../dist/packages/react-ui',
//     emptyOutDir: true,
//     reportCompressedSize: true,
//     commonjsOptions: {
//       transformMixedEsModules: true,
//     },
//     rollupOptions: {
//       onLog(level, log, handler) {
//         if (
//           log.cause &&
//           log.message.includes(`Can't resolve original location of error.`)
//         ) {
//           return;
//         }
//         handler(level, log);
//       },
//     },
//   },
// });

















/// <reference types='vitest' />
import path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { federation } from '@module-federation/vite'; // Import Module Federation

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/react-ui',
  esbuild: {
    target: 'esnext' // Change to a newer target
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          Host: '127.0.0.1:4200',
        },
        ws: true,
      },
    },
    port: 4200,
    host: '0.0.0.0',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@activepieces/shared': path.resolve(
        __dirname,
        '../../packages/shared/src',
      ),
      'ee-embed-sdk': path.resolve(
        __dirname,
        '../../packages/ee/ui/embed-sdk/src',
      ),
      '@activepieces/ee-shared': path.resolve(
        __dirname,
        '../../packages/ee/shared/src',
      ),
      '@activepieces/pieces-framework': path.resolve(
        __dirname,
        '../../packages/pieces/community/framework/src',
      ),
    },
  },

  plugins: [
    react(),
    nxViteTsPaths(),
    checker({
      typescript: true,
    }),
    federation({
      name: "reactUi",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/main" // Expose the main entry point
      },
      shared: ["react", "react-dom"]
    }),
  ],

  build: {
    outDir: '../../dist/packages/react-ui',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      onLog(level, log, handler) {
        if (
          log.cause &&
          log.message.includes(`Can't resolve original location of error.`)
        ) {
          return;
        }
        handler(level, log);
      },
    },
  },
});
