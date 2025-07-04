import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'
import SignInForm from '@/components/Organisms/SignInForm'
import SignUpForm from '@/components/Organisms/SignUpForm'

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true)
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  const switchMode = () => {
    setIsSignIn(!isSignIn)
  }

  return isSignIn ? (
    <SignInForm switchMode={switchMode} />
  ) : (
    <SignUpForm switchMode={switchMode} />
  )
} 