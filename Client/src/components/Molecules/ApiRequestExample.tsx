import React from "react";
import ApiMethodBadge from "../Atoms/ApiMethodBadge";
import CodeBlock from "../Atoms/CodeBlock";

interface ApiRequestExampleProps {
  method: string;
  path: string;
  example: string;
  language?: string;
}

const ApiRequestExample: React.FC<ApiRequestExampleProps> = ({ method, path, example, language }) => (
  <div className="mb-4">
    <div className="flex items-center gap-2 mb-2">
      <ApiMethodBadge method={method} />
      <span className="font-mono text-sm">{path}</span>
    </div>
    <CodeBlock code={example} language={language} />
  </div>
);

export default ApiRequestExample; 