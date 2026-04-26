/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary:    '#6366f1', // indigo-500 — premium
        'primary-dark': '#4f46e5',
        success:    '#10b981',
        warning:    '#f59e0b',
        danger:     '#ef4444',
        background: '#f8f8fc',
        surface:    '#ffffff',
        // Indigo shades used for accents
        indigo: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        }
      },
      borderRadius: {
        card: '16px',
        btn:  '10px',
        xl:   '16px',
        '2xl':'20px',
      },
      fontSize: {
        '2xs': ['11px', { lineHeight: '16px', letterSpacing: '0.06em' }],
      },
      boxShadow: {
        'soft':    '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
        'card':    '0 4px 6px -1px rgba(0,0,0,0.05), 0 10px 40px -10px rgba(0,0,0,0.1)',
        'glow':    '0 0 20px rgba(99,102,241,0.35), 0 4px 16px rgba(99,102,241,0.2)',
        'glow-lg': '0 0 40px rgba(99,102,241,0.5), 0 8px 32px rgba(99,102,241,0.3)',
        'up':      '0 -4px 24px rgba(0,0,0,0.06)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
        'slide-up-fade': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'accordion-up':   'accordion-up 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up-fade':  'slide-up-fade 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
