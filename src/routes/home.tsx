import { useLoaderData } from 'react-router-dom';

export default function Home() {
  const data = useLoaderData() as { message: string };
  return <h1>🏠 Home Page — {data.message}</h1>;
}
