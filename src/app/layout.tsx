import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import clsx from 'clsx'
import { I18nProvider } from '@/shared/lib/i18n/provider'
import { AuthGuard } from '@/shared/ui/AuthGuard'
import { Header } from '@/shared/ui/Header'
import { THEMES } from '@/shared/model/theme'
import styles from './layout.module.scss'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Auth Form App',
  description: 'Modern authentication app with protected routes',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={THEMES.LIGHT}>
      <body className={clsx(inter.variable, jetbrainsMono.variable)}>
        <I18nProvider>
          <div className={styles.appWrapper}>
            <Header />
            <main className={styles.mainContent}>
              <AuthGuard
                fallback={<div className={styles.loadingFallback}>Loading...</div>}
              >
                {children}
              </AuthGuard>
            </main>
          </div>
        </I18nProvider>
      </body>
    </html>
  )
}
