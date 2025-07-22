'use client'

import clsx from 'clsx'
import { useTranslation } from '../../model/i18n'
import { useTheme, THEMES } from '../../model/theme'
import styles from './styles.module.scss'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()
  
  const lightText = t('theme.light')
  const darkText = t('theme.dark')
  
  const nextThemeText = theme === THEMES.LIGHT ? darkText : lightText
  const toggleLabel = t('theme.toggle', { mode: nextThemeText })

  if (!lightText || !darkText) {
    return (
      <div className={styles.themeToggle}>
        <button onClick={toggleTheme} className={styles.toggleButton}>
          <span className={clsx(styles.option, { [styles.active]: theme === THEMES.LIGHT })}>
            Light
          </span>
          <span className={clsx(styles.option, { [styles.active]: theme === THEMES.DARK })}>
            Dark
          </span>
          <div className={clsx(styles.slider, { [styles.sliderDark]: theme === THEMES.DARK })} />
        </button>
      </div>
    )
  }

  return (
    <div className={styles.themeToggle}>
      <button
        onClick={toggleTheme}
        className={styles.toggleButton}
        aria-label={toggleLabel}
      >
        <span
          className={clsx(styles.option, {
            [styles.active]: theme === THEMES.LIGHT,
          })}
        >
          {lightText}
        </span>
        <span
          className={clsx(styles.option, {
            [styles.active]: theme === THEMES.DARK,
          })}
        >
          {darkText}
        </span>
        <div
          className={clsx(styles.slider, {
            [styles.sliderDark]: theme === THEMES.DARK,
          })}
        />
      </button>
    </div>
  )
}
