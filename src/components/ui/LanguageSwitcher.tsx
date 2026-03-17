'use client'

import { useLocale } from '@/lib/locale-context'
import type { Lang } from '@/lib/locales'

const LANGS: Lang[] = ['EN', 'UA']

export function LanguageSwitcher() {
  const { lang, setLang } = useLocale()

  return (
    <div
      className="fixed right-6 top-6 z-50 flex items-center gap-1"
      style={{
        background: 'rgba(3,3,3,0.85)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '8px',
        backdropFilter: 'blur(12px)',
        padding: '2px',
      }}
    >
      {LANGS.map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`lang-btn${lang === l ? ' active' : ''}`}
          aria-label={`Switch to ${l}`}
          aria-pressed={lang === l}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
