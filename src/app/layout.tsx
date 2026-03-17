import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { LocaleProvider } from '@/lib/locale-context'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { StaticBlocks } from '@/components/ui/StaticBlocks'
import { BackgroundFX } from '@/components/ui/BackgroundFX'
import { NoiseCanvas } from '@/components/ui/NoiseCanvas'

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
          {/* Background layer — sits below all content */}
          <BackgroundFX />
          <StaticBlocks />
          {/* Noise overlay — above everything, overlay blend hits text too */}
          <NoiseCanvas />
          {/* Content layer — explicitly above background */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <LanguageSwitcher />
            {children}
          </div>
        </LocaleProvider>
      </body>
    </html>
  )
}
