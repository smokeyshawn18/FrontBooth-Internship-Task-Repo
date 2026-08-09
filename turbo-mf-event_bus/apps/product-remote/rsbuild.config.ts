import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginTailwindcss(),
    pluginModuleFederation({
      name: 'product_remote',
      exposes: {
        './ProductCard': './src/components/ProductCard.tsx',
        './ProductPage': './src/pages/ProductPage.tsx',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        'react-redux': { singleton: true },
        '@mf/cart-store': { singleton: true },
      },
    }),
  ],
  server: { port: 3001 },
});
