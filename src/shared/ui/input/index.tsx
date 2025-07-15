import { InputHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'
import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        {label && (
          <label htmlFor={props.id} className={styles.inputLabel}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            styles.input,
            {
              [styles.inputError]: error
            },
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <span className={styles.inputErrorMessage} role="alert">
            {error}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input' 