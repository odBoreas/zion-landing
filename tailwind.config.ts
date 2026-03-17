import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background:     '#080808',
        surface:        '#111111',
        border:         '#1F1F1F',
        'accent-lime':  '#BFFF00',
        'accent-blue':  '#00D4FF',
        'text-primary': '#F5F5F5',
        'text-muted':   '#6B6B6B',
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero:    ['clamp(3rem, 8vw, 7rem)',   { lineHeight: '1.05', fontWeight: '800' }],
        section: ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1',  fontWeight: '700' }],
      },
      boxShadow: {
        'lime-glow':    '0 0 24px 4px rgba(191, 255, 0, 0.35)',
        'lime-glow-sm': '0 0 12px 2px rgba(191, 255, 0, 0.2)',
        'blue-glow':    '0 0 24px 4px rgba(0, 212, 255, 0.3)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 12px 2px rgba(191, 255, 0, 0.2)' },
          '50%':      { boxShadow: '0 0 28px 6px rgba(191, 255, 0, 0.45)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
