/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFB6C1',
        'primary-dark': '#FFA0B4',
        secondary: '#FFE4EC',
        accent: '#FFD4E0',
        background: '#FFF5F5',
        foreground: '#5D4E60',
        muted: '#C9B8C9',
        border: '#FFE4EC',
        card: '#FFFFFF',
        'card-hover': '#FFF5F7',
        danger: '#FF8FAA',
        success: '#98D8C8',
        warning: '#FFE5A0',
      },
      fontFamily: {
        sans: ['Noto Sans SC', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'sm': '12px',
        'md': '16px',
        'lg': '20px',
        'xl': '28px',
        '2xl': '36px',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(255, 182, 193, 0.2)',
        'hover': '0 12px 40px rgba(255, 182, 193, 0.3)',
        'cute': '0 4px 15px rgba(255, 182, 193, 0.4)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'bounce-in': 'bounce-in 0.5s ease-out',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.4s ease-out',
        'gradient': 'gradient-shift 3s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        'pulse-soft': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        'slide-up': {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}
