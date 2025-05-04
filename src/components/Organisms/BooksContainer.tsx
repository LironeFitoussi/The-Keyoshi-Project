import BookCard, { type Book } from '@/components/Molecules/BookCard'

export interface BooksContainerProps {
  books: Book[];
  onRead: (book: Book) => void;
}

export default function BooksContainer({ books, onRead }: BooksContainerProps) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onRead={onRead} />
      ))}
    </section>
  );
}