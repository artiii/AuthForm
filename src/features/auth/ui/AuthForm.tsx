'use client'

import { useTranslation } from '@/shared/model/i18n'
import { ButtonVariant } from '@/shared/model/ui'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { PasswordInput } from '@/shared/ui/PasswordInput'
import { useSignIn } from '../model/useSignIn'
import styles from './styles.module.scss'

export const AuthForm = () => {
  const { register, errors, isSubmitting, onSubmit } = useSignIn()
  const { t } = useTranslation()

  return (
    <div className={styles.authFormContainer}>
      <form onSubmit={onSubmit} className={styles.authForm} noValidate>
        <h2 className={styles.authTitle}>{t('auth.signIn')}</h2>

        <div className={styles.formField}>
          <Input
            label={t('auth.email')}
            type="email"
            placeholder={t('auth.enterEmail')}
            autoComplete="email"
            {...register('email')}
            error={errors.email?.message}
            id="email"
          />
        </div>

        <div className={styles.formField}>
          <PasswordInput
            label={t('auth.password')}
            placeholder={t('auth.enterPassword')}
            autoComplete="current-password"
            {...register('password')}
            error={errors.password?.message}
            id="password"
          />
        </div>

        <Button
          type="submit"
          variant={
            isSubmitting ? ButtonVariant.DISABLED : ButtonVariant.PRIMARY
          }
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? t('auth.signingIn') : t('auth.signIn')}
        </Button>
      </form>
    </div>
  )
}
