import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import BookMainCard from "../Molecules/BookMainCard";
import ChapterDisplayer from "../Molecules/ChapterDisplayer";
import ChaptersList from "./ChaptersList";
import IconButton from "../Atoms/IconButton";
import { Plus } from "lucide-react";
import React from "react";
import { Book, Chapter } from "@/types/index";

interface BookDetailsProps {
  book: Book;
  onAddChapter: () => void;
  onChapterClick?: (chapterId: string) => void;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book, onAddChapter }) => {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>({
    title: "No Chapter Selected",
    hebrewTitle: "No Chapter Selected",
    content: "No Chapter Selected",
    chapterNumber: 0,
    bookId: book._id || "",
    isTranslated: false,
    index: 0,
    _id: "No Chapter Selected",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft',
  });
  console.log(selectedChapter);
  return (
    <Card className="p-6">
      <CardContent className="grid grid-cols-1 sm:grid-cols-5 gap-6">
        <div className="sm:col-span-1">
          <BookMainCard book={book} />
        </div>
        <div className="sm:col-span-4">
          <ChapterDisplayer
            title={selectedChapter!.title}
            text={selectedChapter!.content}
          />
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
        <ChaptersList
          chapters={book.chapters}
          onChapterSelect={setSelectedChapter}
        />
      </div>
    </Card>
  );
};

export default BookDetails;
