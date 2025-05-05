import React from "react";
import ApiEndpointDoc from "../components/Organisms/ApiEndpointDoc";

const apiEndpoints = [
  {
    title: "List Books",
    description: "Retrieve a list of all books.",
    method: "GET",
    path: "/api/books",
    requestExample: `fetch('/api/books')\n  .then(res => res.json())\n  .then(data => console.log(data));`,
    requestLanguage: "javascript",
    responseStatus: 200,
    responseExample: [
      { id: 1, title: "The Dawn of Yangchen", author: "F.C. Yee" },
      { id: 2, title: "The Shadow of Kyoshi", author: "F.C. Yee" },
    ],
  },
  {
    title: "Get Book by ID",
    description: "Retrieve a single book by its ID.",
    method: "GET",
    path: "/api/books/:id",
    requestExample: `fetch('/api/books/1')\n  .then(res => res.json())\n  .then(data => console.log(data));`,
    requestLanguage: "javascript",
    responseStatus: 200,
    responseExample: { id: 1, title: "The Dawn of Yangchen", author: "F.C. Yee" },
  },
  {
    title: "Create Book",
    description: "Add a new book to the collection.",
    method: "POST",
    path: "/api/books",
    requestExample: `fetch('/api/books', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ title: 'New Book', author: 'Author Name' })\n})\n  .then(res => res.json())\n  .then(data => console.log(data));`,
    requestLanguage: "javascript",
    responseStatus: 201,
    responseExample: { id: 3, title: "New Book", author: "Author Name" },
  },
];

const ApiPage: React.FC = () => (
  <main className="py-12 px-4 min-h-screen bg-muted">
    <h1 className="text-3xl font-bold text-center mb-10">API Documentation</h1>
    {apiEndpoints.map((ep, idx) => (
      <ApiEndpointDoc key={idx} {...ep} />
    ))}
  </main>
);

export default ApiPage; 