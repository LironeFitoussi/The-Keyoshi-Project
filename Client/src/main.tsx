import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { Auth0Provider } from '@auth0/auth0-react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { AuthSync } from './components/AuthSync';
import { Toaster } from './components/ui/toaster';
import './index.css';
import './i18n'; //

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Ensure the root element exists
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: 'openid profile email offline_access'
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <AuthSync />
          <Toaster 
            position="top-right"
            richColors
            closeButton
          />
        </QueryClientProvider>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
