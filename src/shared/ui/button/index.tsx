import { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import { ButtonVariant } from '../../model/ui'
import styles from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
}

export const Button = ({
  variant = ButtonVariant.PRIMARY,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || variant === ButtonVariant.DISABLED

  return (
    <button
      className={clsx(
        styles.button,
        {
          [styles.buttonPrimary]: variant === ButtonVariant.PRIMARY,
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
