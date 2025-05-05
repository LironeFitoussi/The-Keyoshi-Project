import { Card, CardContent } from "../ui/card";
import BookMainCard from "../Molecules/BookMainCard";
import ChapterDisplayer from "../Molecules/ChapterDisplayer";
import ChaptersList from "./ChaptersList";
import IconButton from "../Atoms/IconButton";
import { Plus } from "lucide-react";
import React from "react";
import { Book } from "@/types/index";

interface BookDetailsProps {
  book: Book;
  onAddChapter: () => void;
  onChapterClick?: (chapterId: string) => void;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book, onAddChapter, onChapterClick }) => (
  <Card className="p-6">
    <CardContent className="grid grid-cols-5 gap-6">
      <div className="col-span-1">
        <BookMainCard book={book} />
      </div>
      <div className="col-span-4">
        <ChapterDisplayer title={book.title} text={book.description} />
      </div>
    </CardContent>
    <div>
      <div className="flex items-center justify-between px-2 mt-4">
        <h1 className="text-xl font-semibold">Chapters</h1>
        <IconButton
          icon={<Plus className="w-5 h-5" />}
          label="Add"
          onClick={onAddChapter}
          title="Add Chapter"
        />
      </div>
      <ChaptersList chapters={book.chapters} onChapterClick={onChapterClick} />
    </div>
  </Card>
);

export default BookDetails; 