'use client'

import { useCallback, useEffect, useState } from 'react'

export const THEME_LIGHT = 'light' as const
export const THEME_DARK = 'dark' as const

export const THEMES = {
  LIGHT: THEME_LIGHT,
  DARK: THEME_DARK,
} as const

export type Theme = typeof THEME_LIGHT | typeof THEME_DARK

interface UseThemeReturn {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

export const useTheme = (): UseThemeReturn => {
  const [theme, setThemeState] = useState<Theme>(THEMES.LIGHT)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && (savedTheme === THEMES.LIGHT || savedTheme === THEMES.DARK)) {
      setThemeState(savedTheme)
    }
  }, [])

  useEffect(() => {
    // todo
    const root = document.documentElement
    root.classList.remove(THEMES.LIGHT, THEMES.DARK)
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState(prev => (prev === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT))
  }, [])

  return {
    theme,
    toggleTheme,
    setTheme,
  }
}
