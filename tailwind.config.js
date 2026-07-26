/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Page + surfaces — "Ember on Charcoal"
        ink: {
          DEFAULT: '#0B0F12', // page background
          900: '#0B0F12',
          800: '#0F171A', // exact logo background — use behind logo.png
          700: '#11181D', // cards / raised surfaces
          600: '#161F25',
        },
        // Accent: amber -> orange
        ember: {
          300: '#F7C948',
          400: '#F5B81C',
          500: '#F26A21',
          600: '#D9541A',
        },
        // Rare micro-accent only
        flag: '#E8283C',
        // Type
        ash: {
          100: '#F4F6F8', // headings
          300: '#9AA7B0', // body
          500: '#6B7780', // muted
        },
      },
      fontFamily: {
        display: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Labels and tags use the same geometric sans, uppercase and letter-spaced,
        // rather than a monospace face — monospace reads as "developer tool",
        // not "agency".
        mono: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        ember: 'linear-gradient(135deg, #F5B81C 0%, #F26A21 100%)',
        'ember-soft': 'linear-gradient(135deg, rgba(245,184,28,0.14) 0%, rgba(242,106,33,0.14) 100%)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.35), 0 12px 32px -18px rgba(0,0,0,0.8)',
        lift: '0 1px 2px rgba(0,0,0,0.35), 0 24px 48px -24px rgba(0,0,0,0.9)',
        glow: '0 0 0 1px rgba(245,184,28,0.20), 0 20px 48px -24px rgba(242,106,33,0.45)',
        btn: '0 8px 24px -12px rgba(242,106,33,0.65)',
      },
      letterSpacing: {
        eyebrow: '0.18em',
      },
      keyframes: {
        'scroll-hint': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '45%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '55%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
      },
      animation: {
        'scroll-hint': 'scroll-hint 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
