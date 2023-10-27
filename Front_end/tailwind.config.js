/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#057aff",

          "secondary": "#463aa1",

          "accent": "#c149ad",

          "neutral": "#021431",

          "base-100": "#ffffff",

          "info": "#93e6fb",

          "success": "#80ced1",

          "warning": "#efd8bd",

          "error": "#e58b8b",
        },
        fontFamily: {
          'poppins': ['Poppins', 'sans-serif'],
          'Prompt' : ['Prompt', 'sans-serif' ]
        }, 
      },
    ],
  },
  plugins: [require("daisyui","@tailwindcss/forms")],
}

