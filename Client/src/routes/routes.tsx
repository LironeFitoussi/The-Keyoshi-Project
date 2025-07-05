import { createBrowserRouter } from 'react-router-dom';
import Layout from './_layout';

// Pages
import Home from './home';
import About from './about';
import Contact from './contact';
import MarkdownPage from './markdown';
import ErrorPage from './error';
import Books from './Books';
import Book from './Book';
import ApiPage from './ApiPage';
import AuthPage from './auth';
import AdminDashboard from './AdminDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';
import RequestEditorRole from './RequestEditorRole';

// Loaders

import * as loaders from '@/loaders'
import PageSpinner from '@/components/Atoms/PageSpinner';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
        children: [
      {
        index: true,
        element: <Home />,
        loader: loaders.homeLoader,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      // books
      {
        path: 'books',
        element: <Books />,
        loader: loaders.booksLoader,
        HydrateFallback: () => <PageSpinner />,
      },
      {
        path: 'books/:slug',
        element: <Book />,
        loader: loaders.bookLoader,
        HydrateFallback: () => <PageSpinner />,
      },
      {
        path: 'docs/:slug',
        element: <MarkdownPage />,
        loader: async ({ params }) => {
          const file = await import(`../content/${params.slug}.md?raw`);
          return { content: file.default };
        },
      },
      {
        path: "/api",
        element: <ApiPage />,
      },
      {
        path: 'auth',
        element: <AuthPage />,
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute 
            element={<AdminDashboard />} 
            allowedRoles={['admin']} 
          />
        ),
      },
      {
        path: 'request-editor',
        element: (
          <ProtectedRoute 
            element={<RequestEditorRole />} 
            allowedRoles={['user']} 
          />
        ),
      },
    ],
  },
]);
