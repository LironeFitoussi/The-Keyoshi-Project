import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import BookMainCard from "../Molecules/BookMainCard";
import ChapterDisplayer from "../Molecules/ChapterDisplayer";
import ChaptersList from "./ChaptersList";
import React from "react";
import { Book, Chapter } from "@/types/index";
import { useTranslation } from "react-i18next";

interface BookDetailsProps {
  book: Book;
  onChapterClick?: (chapterId: string) => void;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  const { t } = useTranslation();
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>({
    title: t('book.noChapterSelected'),
    hebrewTitle: t('book.noChapterSelected'),
    content: t('book.noChapterSelected'),
    chapterNumber: 0,
    bookId: book._id || "",
    isTranslated: false,
    index: 0,
    _id: t('book.noChapterSelected'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft',
  });
  const [chapters, setChapters] = useState<Chapter[]>(book.chapters);

  const handleChapterUpdate = (updatedChapter: Chapter) => {
    setChapters((prev) =>
      prev.map((ch) => (ch._id === updatedChapter._id ? { ...ch, ...updatedChapter } : ch))
    );
    setSelectedChapter((prev) =>
      prev && prev._id === updatedChapter._id ? { ...prev, ...updatedChapter } : prev
    );
  };

  // console.log(selectedChapter);
  return (
    <Card className="p-6 rounded-none">
      <CardContent className="grid grid-cols-1 sm:grid-cols-8 gap-6">
        <div className="sm:col-span-3 md:col-span-2">
          <BookMainCard book={book} />
        </div>
        <div className="sm:col-span-5 md:col-span-6">
          <ChapterDisplayer
            title={selectedChapter!.title}
            text={selectedChapter!.content}
          />
        </div>
      </CardContent>

      <div>
        <div className="flex items-center justify-between px-2 mt-4">
          <h1 className="text-xl font-semibold font-heebo">{t('book.chapters')}</h1>
        </div>
        <ChaptersList
          chapters={chapters}
          onChapterSelect={setSelectedChapter}
          onChapterUpdate={handleChapterUpdate}
        />
      </div>
    </Card>
  );
};

export default BookDetails;
