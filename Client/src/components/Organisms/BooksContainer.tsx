import BookCard from '@/components/Molecules/BookCard'
import { Book } from '@/types/index'
export interface BooksContainerProps {
  books: Book[];
}

export default function BooksContainer({ books }: BooksContainerProps) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-8">
      {books.map((book) => (
        <BookCard key={book._id} book={book}/>
      ))}
    </section>
  );
}