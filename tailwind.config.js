/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Unique premium palette — deep teal + warm amber (not copied from reference)
        brand: {
          50: '#effcf9',
          100: '#c9f7ec',
          200: '#96ecdc',
          300: '#5cdcc6',
          400: '#2ec2ac',
          500: '#14a693',
          600: '#0d8578',
          700: '#106a61',
          800: '#12544e',
          900: '#134641',
        },
        accent: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        ink: {
          900: '#0b1220',
          800: '#131c2e',
          700: '#1f2a3d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(16, 106, 97, 0.18)',
        card: '0 8px 30px -10px rgba(11, 18, 32, 0.12)',
        glow: '0 0 0 4px rgba(20, 166, 147, 0.12)',
      },
      keyframes: {
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        floatUp: 'floatUp .5s ease both',
      },
    },
  },
  plugins: [],
}
