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
        'border-glass': 'rgba(255,255,255,0.08)',
        accent:         '#00E5FF',
        'text-primary': '#F0F0F0',
        'text-muted':   '#555560',
        'text-dim':     '#2A2A32',
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display — hero headline
        display: ['clamp(3.5rem, 10vw, 8.5rem)', { lineHeight: '0.95', letterSpacing: '-0.05em', fontWeight: '800' }],
        // Section headings
        heading: ['clamp(2.2rem, 5vw, 4rem)',    { lineHeight: '1.0',  letterSpacing: '-0.04em', fontWeight: '700' }],
        // Subheadings / card titles
        title:   ['1.125rem',                     { lineHeight: '1.4',  letterSpacing: '-0.02em', fontWeight: '600' }],
      },
      boxShadow: {
        // Cyan glow states
        'cyan-glow':    '0 0 40px 8px rgba(0, 229, 255, 0.25)',
        'cyan-glow-sm': '0 0 20px 4px rgba(0, 229, 255, 0.15)',
        'cyan-glow-xs': '0 0 10px 2px rgba(0, 229, 255, 0.10)',
        // Glass card elevation
        'glass':        '0 8px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
        'glass-hover':  '0 12px 50px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      backdropBlur: {
        xl: '24px',
      },
      animation: {
        'pulse-cyan': 'pulseCyan 3s ease-in-out infinite',
      },
      keyframes: {
        pulseCyan: {
          '0%, 100%': { boxShadow: '0 0 20px 4px rgba(0, 229, 255, 0.15)' },
          '50%':      { boxShadow: '0 0 45px 10px rgba(0, 229, 255, 0.30)' },
        },
      },
      backgroundImage: {
        // Hero radial — cyan bloom from top-center
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0, 229, 255, 0.12) 0%, transparent 70%)',
        // Subtle accent line
        'accent-line': 'linear-gradient(90deg, transparent, #00E5FF, transparent)',
      },
    },
  },
  plugins: [],
}

export default config
