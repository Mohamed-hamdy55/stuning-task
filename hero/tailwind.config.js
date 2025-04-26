/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  darkMode:'class',
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      screens:{
        "2560px":"2560px",
        "1440px":"1440px",
        "1024px":"1024px",
        "768px":"768px",
        "425px":"425px",
        "375px":"375px",
        "320px":"320px"
      },
      boxShadow:{
        'search-input-shadow':"0 2px 4px rgba(29, 41, 57, .05), 0 4px 16px rgba(29, 41, 57, .1)"
      },
      zIndex:{
        '5' : 5
      }
    },
  },
  plugins: [],
}

