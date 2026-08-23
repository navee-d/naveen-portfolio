import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base: '/' is used because we have a custom domain (navee.me)
// If using username.github.io/repo-name without custom domain, use base: '/repo-name/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
