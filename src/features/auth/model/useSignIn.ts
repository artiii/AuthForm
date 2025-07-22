'use client'

import { useCallback, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { supabase } from '@/shared/lib/supabaseClient'
import { FormErrorType } from '@/shared/model/form/formErrorTypes'
import { useTranslation } from '@/shared/model/i18n'

const createSignInSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .email(t('validation.emailInvalid'))
      .trim()
      .toLowerCase()
      .min(1, t('validation.emailRequired'))
      .max(128, 'Email is too long'),

    password: z
      .string()
      .trim()
      .min(1, t('validation.passwordRequired'))
      .min(6, t('validation.passwordMinLength'))
      .max(128, 'Password is too long'),
  })

export type SignInFormData = {
  email: string
  password: string
}

export const useSignIn = () => {
  const router = useRouter()
  const { t, locale } = useTranslation()

  const signInSchema = useMemo(() => createSignInSchema(t), [t])

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  })

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = form

  useEffect(() => {
    const currentValues = getValues()
    reset(currentValues)
  }, [locale, reset, getValues])

  const onSubmit = useCallback(
    async (data: SignInFormData) => {
      if (isSubmitting) return

      const { error } = await supabase.auth.signInWithPassword({
        email: data.email.trim().toLowerCase(),
        password: data.password.trim(),
      })

      if (error) {
        setError('password', {
          type: FormErrorType.Server,
          message: error.message,
        })
        setFocus('password')
      } else {
        router.push('/')
      }
    },
    [isSubmitting, setError, setFocus, router]
  )

  return {
    register,
    errors,
    isSubmitting,
    onSubmit: handleSubmit(onSubmit),
  }
}
