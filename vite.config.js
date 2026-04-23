import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ACÁ VA EL NOMBRE DE TU REPOSITORIO ENTRE BARRAS
  base: '/PORTFOLIO/', 
})