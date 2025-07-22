'use client'

import { useState, useEffect, ReactNode, createContext, useContext, useCallback } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { type Locale, defaultLocale, locales } from './index'
import styles from './provider.module.scss'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  prefetchLocale: (locale: Locale) => Promise<void>
}

const I18nContext = createContext<I18nContextType | null>(null)

interface I18nProviderProps {
  children: ReactNode
}

const messagesCache: Partial<Record<Locale, Record<string, unknown>>> = {}

const loadMessages = async (locale: Locale): Promise<Record<string, unknown>> => {
  if (messagesCache[locale]) {
    return messagesCache[locale]
  }

  try {
    const msgs = await import(`./locales/${locale}.json`)
    messagesCache[locale] = msgs.default
    return msgs.default
  } catch (error) {
    console.error(`Failed to load messages for ${locale}:`, error)
    if (locale !== 'en') {
      const fallback = await import('./locales/en.json')
      messagesCache[locale] = fallback.default
      return fallback.default
    }
    throw error
  }
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [messages, setMessages] = useState<Record<string, unknown>>({})
  const [isLoading, setIsLoading] = useState(true)

  const setLocale = useCallback(async (newLocale: Locale) => {
    const msgs = await loadMessages(newLocale)
    setLocaleState(newLocale)
    setMessages(msgs)
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', newLocale)
    }
  }, [])

  const prefetchLocale = useCallback(async (locale: Locale) => {
    await loadMessages(locale)
  }, [])

  useEffect(() => {
    const initializeMessages = async () => {
      setIsLoading(true)

      let initialLocale: Locale = defaultLocale
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('preferred-locale')
        if (stored && locales.includes(stored as Locale)) {
          initialLocale = stored as Locale
        }
      }

      try {
        const msgs = await loadMessages(initialLocale)
        setLocaleState(initialLocale)
        setMessages(msgs)
      } catch (error) {
        console.error('Failed to initialize messages:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeMessages()
  }, [])

  useEffect(() => {
    locales.forEach(l => {
      if (l !== locale) {
        prefetchLocale(l)
      }
    })
  }, [locale, prefetchLocale])

  if (isLoading) {
    return <div className={styles.loadingFallback}>Loading translations...</div>
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, prefetchLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </I18nContext.Provider>
  )
}

export const useI18nLocale = () => {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18nLocale must be used within I18nProvider')
  }
  return context
}

