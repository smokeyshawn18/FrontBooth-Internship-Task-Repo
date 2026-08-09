import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginTailwindcss(),
    pluginModuleFederation({
      name: 'cart_remote',
      exposes: {
        './CartWidget': './src/components/CartWidget.tsx',
        './CartPage': './src/pages/CartPage.tsx',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        'react-redux': { singleton: true },
        '@mf/store': { singleton: true },
      },
    }),
  ],
  server: { port: 3002 },
});
