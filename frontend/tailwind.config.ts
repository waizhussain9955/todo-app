import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Neon Blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        secondary: {
          500: '#8b5cf6', // Purple
        },
        surface: {
          dark: '#0b0f19', // Deep Indigo Background
          card: 'rgba(17, 24, 39, 0.6)', // Glassmorphism Card
          accent: '#3b82f6', // Blue Glow
        },
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        'bg-glow': 'radial-gradient(circle at top, rgba(59,130,246,0.15), transparent)',
        'glass-gradient': 'linear-gradient(rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.02))',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(59, 130, 246, 0.2)',
        'neon-glow': '0 10px 30px rgba(0, 0, 0, 0.4)',
        'neon-glow-soft': '0 5px 15px rgba(0, 0, 0, 0.2)',
        'neon-premium': '0 0 50px rgba(139, 92, 246, 0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      }
    },
  },
  plugins: [],
};
export default config;
