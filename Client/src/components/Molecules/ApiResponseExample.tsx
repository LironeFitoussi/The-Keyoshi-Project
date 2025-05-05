import React from "react";
import CodeBlock from "../Atoms/CodeBlock";

interface ApiResponseExampleProps {
  status: number;
  response: object;
}

const ApiResponseExample: React.FC<ApiResponseExampleProps> = ({ status, response }) => (
  <div className="mb-4">
    <div className="flex items-center gap-2 mb-2">
      <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded border">Status: {status}</span>
    </div>
    <CodeBlock code={JSON.stringify(response, null, 2)} language="json" />
  </div>
);

export default ApiResponseExample; 