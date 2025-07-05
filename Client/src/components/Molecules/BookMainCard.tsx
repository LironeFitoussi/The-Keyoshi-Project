import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import BookImage from "../Atoms/BookImage";
import { Book } from "@/types/index";
function BookCard({ book }: { book: Book }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }}>
      <Card className="flex flex-row sm:flex-col h-full rounded-2xl shadow-md p-0 max-h-[50vh]">
        <div className="w-1/3 sm:w-full rounded-t-2xl overflow-hidden">
          <BookImage src={book.coverImage} alt={`Cover of ${book.title}`} />
        </div>
        <CardContent className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="text-lg font-semibold line-clamp-2">{book.title}</h3>
          <p className="text-sm text-muted-foreground">{book.author}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default BookCard;
