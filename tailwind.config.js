/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#013e39'
      },
      keyframes: {
        'shake-x': {
          '0%, 100%': { marginLeft: '0' },
          '25%': { marginLeft: '0.25rem' },
          '75%': { marginLeft: '-0.25rem' }
        }
      },
      animation: {
        'shake-x': 'shake-x .2s ease-in-out 0s 2'
      }
    }
  },
  corePlugins: { preflight: false }
}
