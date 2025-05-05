import React from "react";
import { cn } from "@/lib/utils";

interface ApiMethodBadgeProps {
  method: string;
}

const methodColors: Record<string, string> = {
  GET: "bg-green-100 text-green-800 border-green-300",
  POST: "bg-blue-100 text-blue-800 border-blue-300",
  PUT: "bg-yellow-100 text-yellow-800 border-yellow-300",
  DELETE: "bg-red-100 text-red-800 border-red-300",
  PATCH: "bg-purple-100 text-purple-800 border-purple-300",
};

const ApiMethodBadge: React.FC<ApiMethodBadgeProps> = ({ method }) => (
  <span
    className={cn(
      "px-2 py-0.5 rounded text-xs font-semibold border",
      methodColors[method.toUpperCase()] || "bg-gray-100 text-gray-800 border-gray-300"
    )}
  >
    {method.toUpperCase()}
  </span>
);

export default ApiMethodBadge; 