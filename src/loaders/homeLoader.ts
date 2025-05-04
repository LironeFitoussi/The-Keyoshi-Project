import type { LoaderFunctionArgs } from 'react-router-dom';

export default async function homeLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const name = searchParams.get('name');
  return { message: `Loaded via homeLoader ${name}` };
}
