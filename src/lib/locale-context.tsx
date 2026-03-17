'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { locales, type Lang, type Locale } from './locales'

interface LocaleContextValue {
  lang: Lang
  t: Locale
  setLang: (l: Lang) => void
}

const LocaleContext = createContext<LocaleContextValue>({
  lang: 'EN',
  t: locales.EN,
  setLang: () => {},
})

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('EN')

  return (
    <LocaleContext.Provider value={{ lang, t: locales[lang] as Locale, setLang }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
