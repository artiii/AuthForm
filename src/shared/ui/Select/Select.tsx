'use client'

import { SelectHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './styles.module.scss'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  startAdornment?: ReactNode
  wrapperClassName?: string
  selectClassName?: string
}

export const Select = ({
  startAdornment,
  children,
  wrapperClassName = '',
  selectClassName = '',
  ...props
}: SelectProps) => {
  return (
    <div className={clsx(styles.selectWrapper, wrapperClassName)}>
      {startAdornment && (
        <span className={styles.startAdornment}>{startAdornment}</span>
      )}
      <select
        className={clsx(styles.select, selectClassName)}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}
