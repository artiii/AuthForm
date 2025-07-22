'use client'

import Link from 'next/link'
import { useAuth } from '@/shared/model/auth'
import { useTranslation } from '@/shared/model/i18n'
import { ButtonVariant } from '@/shared/model/ui'
import { Button } from '@/shared/ui/Button'
import styles from './styles.module.scss'

export default function Home() {
  const { user, signOut, loading } = useAuth()
  const { t } = useTranslation()

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loading}>{t('common.loading')}</div>
      </div>
    )
  }

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.welcomeSection}>
        <h1 className={styles.pageTitle}>{t('common.welcome')}!</h1>
        {user?.email && (
          <p className={styles.userInfo}>
            {t('pages.dashboard.userInfo')}:{' '}
            <span className={styles.userEmail}>{user.email}</span>
          </p>
        )}
      </div>

      <div className={styles.navigationSection}>
        <Link href="/dashboard" className={styles.navLink}>
          {t('pages.home.goToDashboard')} →
        </Link>
      </div>

      <div className={styles.actionSection}>
        <Button
          onClick={handleLogout}
          variant={ButtonVariant.PRIMARY}
          className={styles.logoutButton}
        >
          {t('navigation.logout')}
        </Button>
      </div>
    </div>
  )
}
