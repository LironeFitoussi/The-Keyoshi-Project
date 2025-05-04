import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import BookImage from "../Atoms/BookImage";
import ReadButton from "../Atoms/ReadButton";

export interface Book {
    id: string;
    title: string;
    author: string;
    cover: string;
  }
  
  function BookCard({ book, onRead }: { book: Book; onRead: (book: Book) => void }) {
    return (
      <motion.div whileHover={{ scale: 1.03 }} className="cursor-pointer">
        <Card className="flex h-full flex-col rounded-2xl shadow-md">
          <BookImage src={book.cover} alt={`Cover of ${book.title}`} />
          <CardContent className="flex flex-1 flex-col gap-2 p-4">
            <h3 className="text-lg font-semibold line-clamp-2">{book.title}</h3>
            <p className="text-sm text-muted-foreground">{book.author}</p>
            <ReadButton onClick={() => onRead(book)} />
          </CardContent>
        </Card>
      </motion.div>
    );
  }

export default BookCard;