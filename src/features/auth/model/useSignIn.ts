'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { supabase } from '@/shared/lib/supabaseClient'
import { FormErrorType } from '@/shared/model/form/formErrorTypes'

export const signInSchema = z.object({
  email: z
    .email({ error: 'Email is not correct' })
    .trim()
    .toLowerCase()
    .nonempty('Email is required')
    .max(128, 'Email is too long'),

  password: z
    .string()
    .trim()
    .nonempty('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(128, 'Password is too long')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      'Password must contain letters and numbers'
    ),
})

export type SignInFormData = z.infer<typeof signInSchema>

export const useSignIn = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  })

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
