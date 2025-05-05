import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "json" }) => (
  <div className="rounded-lg border bg-muted p-3 text-sm overflow-x-auto">
    <SyntaxHighlighter
      language={language}
      style={oneLight}
      customStyle={{ background: "none", margin: 0, padding: 0 }}
      showLineNumbers={false}
    >
      {code}
    </SyntaxHighlighter>
  </div>
);

export default CodeBlock; 