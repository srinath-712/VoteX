/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#1a56db',
        success: '#057a55',
        warning: '#c27803',
        danger: '#e02424',
        background: '#f9fafb',
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
