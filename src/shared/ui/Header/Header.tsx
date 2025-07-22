'use client'

import dynamic from 'next/dynamic'
import styles from './styles.module.scss'

const LanguageSelect = dynamic(() => import('@/shared/ui/LanguageSelect').then(mod => ({ default: mod.LanguageSelect })), {
  ssr: false
})

const ThemeToggle = dynamic(() => import('@/shared/ui/ThemeToggle').then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false
})

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.controls}>
          <LanguageSelect />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
