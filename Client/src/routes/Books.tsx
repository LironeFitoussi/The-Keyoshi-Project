import BooksContainer from "@/components/Organisms/BooksContainer";
import { useLoaderData } from "react-router-dom";
import { type Books } from "@/types";
/** Simple shape for the component props */
export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string; // relative path or remote URL
  slug: string;
}


export default function Books() {
  const data = useLoaderData() as { books: Books };
  return (
    <BooksContainer
      books={data.books}
    />
  );
}
