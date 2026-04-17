/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E8B4A0',
        secondary: '#F5E6D3',
        accent: '#C4A77D',
        background: '#FDF9F5',
        foreground: '#3D3D3D',
        muted: '#8B7E74',
        border: '#E8E0D8',
        card: '#FFFFFF',
      },
      fontFamily: {
        serif: ['Noto Serif SC', 'serif'],
        sans: ['Noto Sans SC', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(139, 126, 116, 0.08)',
        'hover': '0 8px 30px rgba(139, 126, 116, 0.12)',
      },
    },
  },
  plugins: [],
}
