import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import styles from "./styles.module.scss";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Auth Form App</h1>
      
      <div className={styles.authSection}>
        <h3 className={styles.authTitle}>Auth</h3>
        <div className={styles.formField}>
          <Input 
            label="Email" 
            type="email" 
            placeholder="Enter your email"
            id="test-email"
          />
        </div>
        <div className={styles.formField}>
          <Input 
            label="Password" 
            type="password" 
            placeholder="Enter your password"
            error="This field is required"
            id="test-password"
          />
        </div>
        <div className={styles.buttonGroup}>
          <Button variant="primary">Sign In</Button>
          <Button variant="disabled">Disabled</Button>
        </div>
      </div>
    </div>
  );
}
