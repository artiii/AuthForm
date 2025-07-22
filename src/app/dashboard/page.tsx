'use client'

import Link from 'next/link'
import { useAuth } from '@/shared/model/auth'
import { useTranslation } from '@/shared/model/i18n'
import { ButtonVariant } from '@/shared/model/ui'
import { Button } from '@/shared/ui/Button'
import styles from './styles.module.scss'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const { t } = useTranslation()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('pages.dashboard.title')}</h1>
        <div className={styles.userSection}>
          {user?.email && (
            <span className={styles.userEmail}>{user.email}</span>
          )}
          <Button
            onClick={handleLogout}
            variant={ButtonVariant.PRIMARY}
            className={styles.logoutButton}
          >
            {t('navigation.logout')}
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.welcomeCard}>
          <h2 className={styles.cardTitle}>
            {t('pages.dashboard.welcomeMessage')}
          </h2>
          <p className={styles.cardDescription}>
            {t('pages.home.description')}
          </p>
        </div>

        <div className={styles.navigation}>
          <Link href="/" className={styles.navLink}>
            ← {t('navigation.home')}
          </Link>
        </div>
      </div>
    </div>
  )
}
