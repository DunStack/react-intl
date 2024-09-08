import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  publicDir: false,
  build: {
    lib: {
      entry: './lib/main.tsx',
      name: 'Intl',
      fileName: 'main'
    },
    rollupOptions: {
      external: 'react',
      output: {
        globals: {
          react: 'React'
        }
      }
    }
  },
  plugins: [
    dts({ include: "lib" })
  ]
})
