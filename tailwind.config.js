/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mw: {
          blue: '#2155F5',
          deepBlue: '#1645D8',
          navy: '#071438',
          bg: '#F5F7FB',
          surface: '#FFFFFF',
          text: '#101828',
          subtext: '#7B8497',
          success: '#16A085',
          warning: '#F5A623',
          error: '#E5484D',
          border: '#E6EAF2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 10px rgba(7, 20, 56, 0.04), 0 1px 3px rgba(7, 20, 56, 0.02)',
        'float': '0 10px 25px -5px rgba(33, 85, 245, 0.25), 0 8px 10px -6px rgba(33, 85, 245, 0.15)',
        'modal': '0 20px 40px -10px rgba(7, 20, 56, 0.2)',
      }
    },
  },
  plugins: [],
}

