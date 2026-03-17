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
        background:     '#030303',
        surface:        'rgba(255,255,255,0.03)',
        'border-glass': 'rgba(255,255,255,0.10)',
        accent:         '#00E5FF',
        // ── Two text shades. No dirty grays.
        'text-primary': '#FFFFFF',
        'text-muted':   '#A1A1AA',
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(3.5rem,10vw,8.5rem)', { lineHeight:'0.95', letterSpacing:'-0.05em', fontWeight:'800' }],
        heading: ['clamp(2.2rem,5vw,4rem)',    { lineHeight:'1.0',  letterSpacing:'-0.04em', fontWeight:'700' }],
      },
      boxShadow: {
        'cyan-glow':    '0 0 40px 8px rgba(0,229,255,0.25)',
        'cyan-glow-sm': '0 0 20px 4px rgba(0,229,255,0.15)',
        'glass':        '0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
        'glass-hover':  '0 12px 50px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
}

export default config
