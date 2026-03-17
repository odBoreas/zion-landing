import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { LocaleProvider } from '@/lib/locale-context'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

const geist = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist',
  weight: '100 900',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://zion.chat'),
  title: 'ZION — Private Messenger',
  description: 'No sign-up. No tracking. Just chat.',
  openGraph: {
    title: 'ZION — Private Messenger',
    description: 'No sign-up. No tracking. Just chat.',
    images: [{ url: '/og-image.webp', width: 1200, height: 630 }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="bg-background text-text-primary antialiased">
        <LocaleProvider>
          {/* Atmospheric glow blobs */}
          <div aria-hidden="true" className="atm-glow" style={{ width: '600px', height: '600px', top: '-200px', left: '-200px', background: 'rgba(0,229,255,0.12)' }} />
          <div aria-hidden="true" className="atm-glow" style={{ width: '500px', height: '500px', bottom: '10%', right: '-150px', background: 'rgba(0,229,255,0.09)' }} />
          <div aria-hidden="true" className="atm-glow" style={{ width: '400px', height: '400px', top: '55%', left: '30%', background: 'rgba(0,229,255,0.06)' }} />
          <LanguageSwitcher />
          {children}
        </LocaleProvider>
      </body>
    </html>
  )
}
