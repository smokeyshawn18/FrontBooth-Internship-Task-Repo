import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'host',
      remotes: {
        product_remote: 'product_remote@http://localhost:3001/mf-manifest.json',
        cart_remote: 'cart_remote@http://localhost:3002/mf-manifest.json',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        'react-redux': { singleton: true },
        '@mf/cart-store': { singleton: true },
      },
    }),
  ],
  server: { port: 3000 },
});
