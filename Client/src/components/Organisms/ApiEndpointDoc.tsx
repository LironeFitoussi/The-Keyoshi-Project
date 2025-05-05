import React from "react";
import ApiRequestExample from "../Molecules/ApiRequestExample";
import ApiResponseExample from "../Molecules/ApiResponseExample";

interface ApiEndpointDocProps {
  title: string;
  description: string;
  method: string;
  path: string;
  requestExample: string;
  requestLanguage?: string;
  responseStatus: number;
  responseExample: object;
}

const ApiEndpointDoc: React.FC<ApiEndpointDocProps> = ({
  title,
  description,
  method,
  path,
  requestExample,
  requestLanguage,
  responseStatus,
  responseExample,
}) => (
  <section className="mb-8 p-6 bg-white rounded-xl shadow border max-w-2xl mx-auto">
    <h3 className="text-lg font-bold mb-1">{title}</h3>
    <p className="text-muted-foreground text-sm mb-4">{description}</p>
    <ApiRequestExample method={method} path={path} example={requestExample} language={requestLanguage} />
    <ApiResponseExample status={responseStatus} response={responseExample} />
  </section>
);

export default ApiEndpointDoc; 