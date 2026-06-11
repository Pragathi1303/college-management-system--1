/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        navy: {
          50: '#f0f4fc',
          100: '#d9e2f4',
          200: '#bcccec',
          300: '#8eade0',
          400: '#5b88d1',
          500: '#3a6abc',
          600: '#2b509e',
          700: '#254180',
          800: '#1a2f47',
          900: '#0d1b2a',
          950: '#070f1a',
        },
        gold: {
          50: '#fef7e4',
          100: '#fcecb9',
          200: '#f9df86',
          300: '#f5cd52',
          400: '#f0ba2a',
          500: '#c8922a',
          600: '#a6771f',
          700: '#855b18',
          800: '#6a4713',
          900: '#543810',
        },
        accent: {
          cyan: '#00d4ff',
          pink: '#ff6bcb',
          green: '#43e97b',
          purple: '#8b5cf6',
          orange: '#fb923c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.4s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(5px) rotate(-1deg)' },
        }
      },
    },
  },
  plugins: [],
}