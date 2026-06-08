import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        poets: resolve(__dirname, 'poets.html'),
        fall: resolve(__dirname, 'fall.html'),
        poet: resolve(__dirname, 'poet.html'),
      }
    }
  }
})