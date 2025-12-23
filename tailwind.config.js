/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.tsx"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        canvas: {
          DEFAULT: '#020408',
          subtle: '#08090B',
          elevated: '#0F1115',
        },
        surface: {
          glass: 'rgba(255, 255, 255, 0.03)',
          glassHigh: 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHigh: 'rgba(255, 255, 255, 0.15)',
        },
        primary: {
          DEFAULT: '#06B6D4',
          glow: '#22D3EE',
          dim: 'rgba(6, 182, 212, 0.1)',
          dark: '#0891B2'
        },
        accent: {
          DEFAULT: '#6366F1',
          glow: '#818CF8',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(6, 182, 212, 0.25)',
        'glass-lg': '0 24px 60px -12px rgba(0, 0, 0, 0.6)',
        'inner-light': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
        'inner-glow': 'inset 0 0 20px rgba(6, 182, 212, 0.05)',
      },
      backgroundImage: {
        'tech-grid': 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        'aurora-gradient': 'radial-gradient(circle at 50% -20%, rgba(6, 182, 212, 0.15) 0%, rgba(2, 4, 8, 0) 50%)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'shine': 'shine 4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 40s linear infinite',
        'scanline': 'scanline 8s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'border-beam': 'borderBeam 8s linear infinite',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-150%) skewX(-20deg)' },
          '100%': { transform: 'translateX(150%) skewX(-20deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        borderBeam: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        }
      },
    },
  },
  plugins: [],
}
