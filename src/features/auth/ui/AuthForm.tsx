'use client'

import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { ButtonVariant } from '@/shared/model/ui'
import { useSignIn } from '../model/useSignIn'
import styles from './styles.module.scss'

export const AuthForm = () => {
  const { register, errors, isSubmitting, onSubmit } = useSignIn()

  return (
    <div className={styles.authFormContainer}>
      <form onSubmit={onSubmit} className={styles.authForm} noValidate>
        <h2 className={styles.authTitle}>Sign In</h2>
        
        <div className={styles.formField}>
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            {...register('email')}
            error={errors.email?.message}
            id="email"
          />
        </div>

        <div className={styles.formField}>
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            {...register('password')}
            error={errors.password?.message}
            id="password"
          />
        </div>

        <Button
          type="submit"
          variant={isSubmitting ? ButtonVariant.DISABLED : ButtonVariant.PRIMARY}
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </div>
  )
} 