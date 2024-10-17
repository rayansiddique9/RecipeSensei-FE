import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      api: "/src/api",
      pages: "/src/pages",
      components: "/src/components",
      common: "/src/common",
      utils: "/src/utils",
      assets: "/src/assets",
      reduxStore: "/src/reduxStore",
      config: "/src/config",
      modals: "/src/modals"
    },
  },
})

