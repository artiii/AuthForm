'use client'

import { ReactNode, useEffect, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '../../model/auth'

interface AuthGuardProps {
  children: ReactNode
  fallback?: ReactNode
}

const PUBLIC_ROUTES = new Set(['/login'])

export const AuthGuard = ({
  children,
  fallback = <div>Loading...</div>,
}: AuthGuardProps) => {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const isPublicRoute = useMemo(() => PUBLIC_ROUTES.has(pathname), [pathname])

  useEffect(() => {
    if (loading) return

    if (!user && !isPublicRoute) {
      router.replace('/login')
      return
    }

    if (user && isPublicRoute) {
      router.replace('/')
    }
  }, [loading, user, isPublicRoute, router])

  if (loading) return <>{fallback}</>

  if ((!user && !isPublicRoute) || (user && isPublicRoute)) return null

  return <>{children}</>
}
