import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// configure the dotenv
config();

// https://vite.dev/config/
export default defineConfig({
  // invoke the plugins 
  plugins: [react(), svgr(), tsconfigPaths()],
  
  // Your Vite configuration
  define: {
    'process.env': process.env
  },
  
  
})
