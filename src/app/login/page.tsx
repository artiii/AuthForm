import { AuthForm } from "@/features/auth/ui/AuthForm";
import styles from "./styles.module.scss";

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <h1 className={styles.loginTitle}>Welcome Back</h1>
        <p className={styles.loginSubtitle}>Sign in to your account</p>
        <AuthForm />
      </div>
    </div>
  );
} 