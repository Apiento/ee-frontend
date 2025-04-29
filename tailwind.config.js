/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
        display: ['Instrument Sans', 'Inter var', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      letterSpacing: {
        'supertight': '-0.05em',
        'superwide': '0.1em',
      },
      fontSize: {
        '2xs': '0.625rem',
        '10xl': '10rem',
      },
      height: {
        '112': '28rem',
        '128': '32rem',
      },
      lineHeight: {
        'supertight': '1.1',
      },
      colors: {
        gray: {
          950: '#0C0C0C',
          900: '#1A1A1A',
          800: '#262626',
          700: '#404040',
          600: '#525252',
          500: '#737373',
          400: '#A3A3A3',
          300: '#D4D4D4',
          200: '#E5E5E5',
          100: '#F5F5F5',
          50: '#FAFAFA',
        },
      },
    },
  },
  plugins: [],
};