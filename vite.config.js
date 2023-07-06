import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
// https://vitejs.dev/config/
dotenv.config()
export default defineConfig({
  define:{
    __API_URL__:`"${process.env.API_URL}"`
  },
  plugins: [react()],
})
