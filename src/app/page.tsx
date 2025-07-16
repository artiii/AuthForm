'use client'

import { useAuth } from "@/shared/model/auth";
import { Button } from "@/shared/ui/button";
import { ButtonVariant } from "@/shared/model/ui";
import Link from "next/link";
import styles from "./styles.module.scss";

export default function Home() {
  const { user, signOut, loading } = useAuth()

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loading}>Loading...</div>
      </div>
    )
  }

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.welcomeSection}>
        <h1 className={styles.pageTitle}>
          Welcome!
        </h1>
        {user?.email && (
          <p className={styles.userInfo}>
            Logged in as: <span className={styles.userEmail}>{user.email}</span>
          </p>
        )}
      </div>

      <div className={styles.navigationSection}>
        <Link href="/dashboard" className={styles.navLink}>
          Go to Dashboard →
        </Link>
      </div>

      <div className={styles.actionSection}>
        <Button
          onClick={handleLogout}
          variant={ButtonVariant.PRIMARY}
          className={styles.logoutButton}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
