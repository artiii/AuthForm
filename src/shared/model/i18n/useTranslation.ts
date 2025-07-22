'use client'

import { useCallback } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { locales, type Locale } from '@/shared/lib/i18n'
import { useI18nLocale } from '@/shared/lib/i18n/provider'

export const useTranslation = () => {
  const t = useTranslations()
  const currentLocale = useLocale() as Locale
  const { setLocale, prefetchLocale } = useI18nLocale()

  const safeT = useCallback((key: string, params?: Record<string, string>) => {
    try {
      return t(key, params)
    } catch {
      console.warn(`Translation missing: ${key} (${currentLocale})`)
      return key
    }
  }, [t, currentLocale])

  const changeLocale = useCallback(
    (newLocale: Locale) => {
      setLocale(newLocale)
    },
    [setLocale]
  ) as ((newLocale: Locale) => void) & { prefetch: (locale: Locale) => Promise<void> }

  changeLocale.prefetch = prefetchLocale

  const getPreferredLocale = useCallback((): Locale => {
    if (typeof window === 'undefined') return 'en'

    const stored = localStorage.getItem('preferred-locale') as Locale
    return locales.includes(stored) ? stored : 'en'
  }, [])

  return {
    t: safeT,
    locale: currentLocale,
    locales,
    changeLocale,
    getPreferredLocale,
  }
}
