import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  let message = 'Unknown error occurred';
  let details = '';
  
  console.error('Route error:', error);
  
  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
    details = error.data?.message || '';
  } else if (error instanceof Error) {
    message = error.message;
    details = error.stack || '';
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Error</h1>
      <p className="text-lg mb-2">{message}</p>
      {details && (
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-w-full">
          {details}
        </pre>
      )}
    </div>
  );
}
