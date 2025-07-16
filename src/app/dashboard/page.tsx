'use client'

import { useAuth } from "@/shared/model/auth"
import { Button } from "@/shared/ui/button"
import { ButtonVariant } from "@/shared/model/ui"
import Link from "next/link"
import styles from "./styles.module.scss"

export default function Dashboard() {
  const { user, signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <div className={styles.userSection}>
          {user?.email && (
            <span className={styles.userEmail}>{user.email}</span>
          )}
          <Button 
            onClick={handleLogout}
            variant={ButtonVariant.PRIMARY}
            className={styles.logoutButton}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.welcomeCard}>
          <h2 className={styles.cardTitle}>Protected Content</h2>
          <p className={styles.cardDescription}>
            This page is only accessible to authenticated users. 
            The AuthGuard component automatically redirects unauthenticated users to the login page.
          </p>
        </div>

        <div className={styles.navigation}>
          <Link href="/" className={styles.navLink}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
} 