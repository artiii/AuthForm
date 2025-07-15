import { AuthForm } from "@/features/auth/ui/AuthForm";
import styles from "./styles.module.scss";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>TODO: delete?</h1>
      <AuthForm />
    </div>
  );
}
