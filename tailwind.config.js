/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#E8F0FC',
          100: '#C5DBF7',
          200: '#9FC5F2',
          300: '#78AEED',
          400: '#5B9DE9',
          500: '#3D8CE5',
          600: '#2563EB',
          700: '#1B4FD6',
          800: '#143AB8',
          900: '#0B1F3A',
          950: '#071225',
        },
        navy: {
          50: '#E8ECF2',
          100: '#C5CEDB',
          200: '#9FB0C1',
          300: '#7891A7',
          400: '#5B7991',
          500: '#3D617B',
          600: '#2D4A62',
          700: '#1E3A5A',
          800: '#162D47',
          900: '#0B1F3A',
          950: '#061222',
        },
        gold: {
          50: '#FBF6E8',
          100: '#F5E9C5',
          200: '#F0DB9F',
          300: '#E9CD78',
          400: '#E4C35B',
          500: '#D4AF37',
          600: '#BD9A2D',
          700: '#9F8025',
          800: '#80661D',
          900: '#664F17',
          950: '#3D300D',
        },
        slate: {
          850: '#172033',
          950: '#0a0f1a',
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 20px 50px -15px rgba(0, 0, 0, 0.08)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-left': 'slideLeft 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'Poppins, system-ui, sans-serif',
          },
        },
      },
    },
  },
  plugins: [],
};
