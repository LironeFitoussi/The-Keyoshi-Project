import { useLoaderData } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function MarkdownPage() {
  const { content } = useLoaderData() as { content: string };

  return (
    <div>
      <h1>📄 Markdown Page</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
