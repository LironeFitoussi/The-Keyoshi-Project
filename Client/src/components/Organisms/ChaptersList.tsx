import ChapterCard from "../Molecules/ChapterCard";
import React from "react";

interface ChaptersListProps {
  chapters: {
    _id: string;
    index: number;
    title: string;
    content: string;
    isTranslated: boolean;
  }[];
  onChapterClick?: (chapterId: string) => void;
}

const ChaptersList: React.FC<ChaptersListProps> = ({ chapters, onChapterClick }) => (
  <div className="flex gap-4 overflow-x-auto py-4 px-2">
    {chapters.map((chapter) => (
      <ChapterCard
        key={chapter._id}
        chapter={chapter}
        onClick={onChapterClick ? () => onChapterClick(chapter._id) : undefined}
      />
    ))}
  </div>
);

export default ChaptersList; 