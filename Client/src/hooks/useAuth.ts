import { useAuth0, User } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'

export const useAuth = () => {
  const auth0 = useAuth0()
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false)
  const [customUser, setCustomUser] = useState<User | null>(null)

  useEffect(() => {
    if (hasCheckedStorage) return

    const token = localStorage.getItem('auth0_token')
    const idToken = localStorage.getItem('auth0_id_token')
    const userString = localStorage.getItem('auth0_user')
    const expiresAt = localStorage.getItem('auth0_expires_at')

    if (token && idToken && userString && expiresAt) {
      if (Date.now() > parseInt(expiresAt)) {
        // Clear expired tokens
        localStorage.removeItem('auth0_token')
        localStorage.removeItem('auth0_id_token')
        localStorage.removeItem('auth0_user')
        localStorage.removeItem('auth0_expires_at')
        setCustomUser(null)
      } else {
        // Parse and set user data from localStorage
        try {
          const user = JSON.parse(userString)
          setCustomUser(user)
        } catch (error) {
          console.error('Error parsing user data from localStorage:', error)
        }
      }
    }

    setHasCheckedStorage(true)
  }, [hasCheckedStorage])

  const isCustomAuth = hasCheckedStorage && !!localStorage.getItem('auth0_token')
  const isAuthenticated = auth0.isAuthenticated || isCustomAuth

  return {
    ...auth0,
    isAuthenticated,
    user: auth0.user || customUser,
    isLoading: auth0.isLoading && !hasCheckedStorage
  }
} 