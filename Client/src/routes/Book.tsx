import { useLoaderData, useNavigate } from "react-router-dom";
import { type Book } from "@/types/index";
import BookDetails from "@/components/Organisms/BookDetails";

export default function Book() {
  const data = useLoaderData() as { book: Book };
  const navigate = useNavigate();

  return (
    <BookDetails
      book={data.book}
      onAddChapter={() => navigate(`/books/${data.book._id}/add-chapter`)}
      // Optionally, handle chapter click here
    />
  );
}
