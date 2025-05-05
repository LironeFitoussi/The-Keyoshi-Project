import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import BookImage from "../Atoms/BookImage";
import ReadButton from "../Atoms/ReadButton";
import { Book } from "@/types/index";
import { useNavigate } from "react-router-dom";
function BookCard({ book,}: {
  book: Book;
}) {
  const navigate = useNavigate();
  return (
    <motion.div whileHover={{ scale: 1.03 }}>
      <Card className="flex h-full flex-col rounded-2xl shadow-md p-0">
        <BookImage src={book.coverImage} alt={`Cover of ${book.title}`} />
        <CardContent className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="text-lg font-semibold line-clamp-2">{book.title}</h3>
          <p className="text-sm text-muted-foreground">{book.author}</p>
          <ReadButton onClick={() => navigate(`/books/${book.slug}`)} />
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default BookCard;
