/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        peach:    { 50: '#fff8f5', 100: '#ffe8db', 200: '#ffd0b8', 300: '#ffb394', 400: '#ff8f68', 500: '#ff6b42' },
        sky:      { 50: '#f0f9ff', 100: '#e0f3ff', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9' },
        mint:     { 50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 500: '#22c55e' },
        lavender: { 50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7' },
        lemon:    { 50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15', 500: '#eab308' },
        rose:     { 50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185', 500: '#f43f5e' },
        warm:     { 50: '#fdf9f7', 100: '#f5efe9', 200: '#ede0d4', 300: '#d9c4b0', 400: '#b89b80', 500: '#8b6f5a' },
      },
      fontFamily: {
        heading: ['Fredoka', 'Baloo 2', 'sans-serif'],
        body:    ['"Be Vietnam Pro"', 'Nunito', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft':    '0 4px 20px rgba(0,0,0,0.06)',
        'soft-md': '0 8px 30px rgba(0,0,0,0.09)',
        'soft-lg': '0 16px 48px rgba(0,0,0,0.12)',
      },
      screens: {
        'xs': '375px',
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
