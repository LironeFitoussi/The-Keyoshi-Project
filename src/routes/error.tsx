import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  let message = 'Unknown error occurred';

  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
  }

  return <h1>❌ Error: {message}</h1>;
}
