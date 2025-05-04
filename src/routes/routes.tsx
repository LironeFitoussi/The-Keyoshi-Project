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

import * as loaders from '@/loaders'

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
        // nested routes
        children: [
          {
            path: ':name-slug',
            element: <Book />,
          },
        ],
      },
      {
        path: 'docs/:slug',
        element: <MarkdownPage />,
        loader: async ({ params }) => {
          const file = await import(`../content/${params.slug}.md?raw`);
          return { content: file.default };
        },
      },
    ],
  },
]);
