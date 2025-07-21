import { AuthForm } from '@/features/auth/ui/AuthForm'
import styles from './styles.module.scss'

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <AuthForm />
      </div>
    </div>
  )
}
