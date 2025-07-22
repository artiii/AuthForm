'use client'

import { InputHTMLAttributes, forwardRef, useState, useCallback } from 'react'
import clsx from 'clsx'
import { EyeIcon, EyeOffIcon } from '@/shared/ui/Icons'
import styles from './styles.module.scss'

interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = useCallback(() => {
      setIsVisible(prev => !prev)
    }, [])

    return (
      <div className={styles.passwordWrapper}>
        {label && (
          <label htmlFor={props.id} className={styles.passwordLabel}>
            {label}
          </label>
        )}
        <div className={styles.passwordInputContainer}>
          <input
            ref={ref}
            type={isVisible ? 'text' : 'password'}
            className={clsx(
              styles.passwordInput,
              {
                [styles.passwordInputError]: error,
              },
              className
            )}
            aria-invalid={!!error}
            {...props}
          />
          <button
            type="button"
            className={styles.toggleButton}
            onClick={toggleVisibility}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isVisible}
            tabIndex={-1}
          >
            {isVisible ? (
              <EyeOffIcon className={styles.eyeIcon} />
            ) : (
              <EyeIcon className={styles.eyeIcon} />
            )}
          </button>
        </div>
        {error && (
          <span className={styles.passwordErrorMessage} role="alert">
            {error}
          </span>
        )}
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'
