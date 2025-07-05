import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUserByEmail } from '@/store/slices/userSlice';
import { resetSync } from '@/store/slices/authSyncSlice';
import { setTokenGetter } from '@/api/axiosInstance';
import { useAuth0 } from '@auth0/auth0-react';

export function AuthSync() {
  const { user, isAuthenticated, isLoading: isAuth0Loading } = useAuth();
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const syncAttempted = useRef(false);
  const { isInitialSyncComplete } = useAppSelector((state) => state.authSync);

  // Set up API token getter
  useEffect(() => {
    // Set up the token getter with proper type handling
    setTokenGetter(async () => {
      try {
        // First try to get token from localStorage (custom login)
        const localToken = localStorage.getItem('auth0_token');
        if (localToken) {
          const expiresAt = localStorage.getItem('auth0_expires_at');
          if (expiresAt && Date.now() < parseInt(expiresAt)) {
            return localToken;
          }
        }

        // Fallback to Auth0 token if available
        if (getAccessTokenSilently) {
          return await getAccessTokenSilently();
        }
        
        throw new Error('No token available');
      } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
      }
    });
  }, [getAccessTokenSilently]);

  // Handle user sync
  useEffect(() => {
    // Reset sync state when auth state changes
    if (!isAuthenticated) {
      dispatch(resetSync());
      syncAttempted.current = false;
      return;
    }

    // Don't proceed if still loading Auth0
    if (isAuth0Loading) {
      // console.log('Auth0 still loading...');
      return;
    }

    // Only sync if we haven't attempted it yet and have user data
    if (!syncAttempted.current && user?.email && !isInitialSyncComplete) {
      // console.log('Starting initial sync for:', user.email);
      syncAttempted.current = true;
      
      // Wrap the dispatch in a try-catch to handle potential errors
      try {
        dispatch(fetchUserByEmail({
          email: user.email,
          firstName: user.given_name || '',
          lastName: user.family_name || ''
        }));
      } catch (error) {
        console.error('Error during user sync:', error);
        syncAttempted.current = false; // Reset the attempt flag to allow retrying
      }
    }
  }, [
    isAuthenticated,
    isAuth0Loading,
    user,
    dispatch,
    isInitialSyncComplete
  ]);

  // Return a fragment instead of null to ensure proper React rendering
  return <></>;
} 