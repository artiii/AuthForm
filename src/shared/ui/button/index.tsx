import { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'disabled'
  children: ReactNode
}

export const Button = ({
  variant = 'primary',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || variant === 'disabled'

  return (
    <button
      className={clsx(
        styles.button,
        {
          [styles.buttonPrimary]: variant === 'primary',
          [styles.buttonDisabled]: isDisabled
        },
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  )
}
