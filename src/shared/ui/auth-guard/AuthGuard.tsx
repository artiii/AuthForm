'use client'

import { useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '../../model/auth'

interface AuthGuardProps {
  children: ReactNode
  fallback?: ReactNode
}

const publicRoutes = ['/login']

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  fallback = <div>Loading...</div>
}) => {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !user && !publicRoutes.includes(pathname)) {
      router.push('/login')
    }
  }, [user, loading, router, pathname])

  if (loading) {
    return <>{fallback}</>
  }

  if (!user && !publicRoutes.includes(pathname)) {
    return <>{fallback}</>
  }

  if (user && pathname === '/login') {
    router.push('/')
    return <>{fallback}</>
  }

  return <>{children}</>
}
