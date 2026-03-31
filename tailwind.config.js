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
          DEFAULT: '#030712',
          subtle: '#06091A',
          elevated: '#0C1428',
        },
        surface: {
          glass: 'var(--color-surface-glass)',
          glassHigh: 'var(--color-surface-glassHigh)',
          border: 'var(--color-surface-border)',
          borderHigh: 'var(--color-surface-borderHigh)',
        },
        primary: {
          DEFAULT: '#06B6D4',
          glow: '#22D3EE',
          dim: 'rgba(6, 182, 212, 0.12)',
          dark: '#0891B2',
        },
        accent: {
          DEFAULT: '#6366F1',
          glow: '#818CF8',
        },
        warm: {
          DEFAULT: '#A855F7',
          glow: '#C084FC',
          dim: 'rgba(168, 85, 247, 0.10)',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
        },
      },
      boxShadow: {
        'neon-cyan':   '0 0 30px rgba(6, 182, 212, 0.45), 0 0 60px rgba(6, 182, 212, 0.15)',
        'neon-violet': '0 0 30px rgba(168, 85, 247, 0.40), 0 0 60px rgba(168, 85, 247, 0.15)',
        'neon-indigo': '0 0 25px rgba(99, 102, 241, 0.40), 0 0 50px rgba(99, 102, 241, 0.15)',
        'glass-lg':    '0 24px 60px -12px rgba(0, 0, 0, 0.75)',
        'inner-light': 'var(--shadow-inner-light)',
        'inner-glow':  'inset 0 0 30px rgba(6, 182, 212, 0.07)',
      },
      backgroundImage: {
        'tech-grid':
          'linear-gradient(rgba(6, 182, 212, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.06) 1px, transparent 1px)',
        'aurora-gradient':
          'radial-gradient(ellipse at 30% -10%, rgba(6, 182, 212, 0.18) 0%, transparent 50%), radial-gradient(ellipse at 70% -10%, rgba(168, 85, 247, 0.12) 0%, transparent 50%)',
        'cyber-gradient':
          'linear-gradient(135deg, #06B6D4 0%, #6366F1 50%, #A855F7 100%)',
      },
      animation: {
        'spin-slow':   'spin 12s linear infinite',
        'shine':       'shine 4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'pulse-slow':  'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee':     'marquee 80s linear infinite',
        'scanline':    'scanline 8s linear infinite',
        'fade-in-up':  'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float':       'float 6s ease-in-out infinite',
        'border-beam': 'borderBeam 8s linear infinite',
      },
      keyframes: {
        shine: {
          '0%':   { transform: 'translateX(-150%) skewX(-20deg)' },
          '100%': { transform: 'translateX(150%) skewX(-20deg)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scanline: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        borderBeam: {
          '0%, 100%': { opacity: '0' },
          '50%':      { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
