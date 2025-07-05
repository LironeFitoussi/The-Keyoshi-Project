import { useLoaderData } from "react-router-dom";
import { type Book } from "@/types/index";
import BookDetails from "@/components/Organisms/BookDetails";

export default function Book() {
  const data = useLoaderData() as { book: Book };

  return (
    <BookDetails
      book={data.book}
      // Optionally, handle chapter click here
    />
  );
}
