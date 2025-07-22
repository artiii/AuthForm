'use client'

import { useCallback } from 'react'
import { type Locale } from '@/shared/lib/i18n'
import { useTranslation } from '@/shared/model/i18n'
import { Select } from '@/shared/ui/Select'
import styles from './styles.module.scss'

const languageData = {
  en: { flag: '🇺🇸', name: 'English' },
  ru: { flag: '🇷🇺', name: 'Русский' },
  ja: { flag: '🇯🇵', name: '日本語' },
} as const

export const LanguageSelect = () => {
  const { locale, locales, changeLocale } = useTranslation()

  const handleLanguageChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newLocale = event.target.value as Locale
      changeLocale(newLocale)
    },
    [changeLocale]
  )

  const handleMouseEnter = useCallback(
    (targetLocale: Locale) => {
      const prefetch = (changeLocale as typeof changeLocale & { prefetch?: (locale: Locale) => Promise<void> }).prefetch
      if (prefetch && targetLocale !== locale) {
        prefetch(targetLocale)
      }
    },
    [changeLocale, locale]
  )

  return (
    <div>
      <Select
        value={locale}
        onChange={handleLanguageChange}
        aria-label="Change language"
        startAdornment={
          <span className={styles.flag}>{languageData[locale].flag}</span>
        }
      >
        {locales.map(loc => (
          <option
            key={loc}
            value={loc}
            onMouseEnter={() => handleMouseEnter(loc)}
          >
            {languageData[loc].name}
          </option>
        ))}
      </Select>
    </div>
  )
}
