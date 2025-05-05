import { Chapter } from "@/types";
import ChapterCard from "../Molecules/ChapterCard";
import React from "react";

interface ChaptersListProps {
  chapters: Chapter[];
  onChapterSelect?: (chapter: Chapter) => void;
}

const ChaptersList: React.FC<ChaptersListProps> = ({ chapters, onChapterSelect }) => (
  <div className="flex gap-4 overflow-x-auto py-4 px-2">
    {chapters.map((chapter) => (
      <ChapterCard
        key={chapter._id}
        chapter={chapter}
        onChapterSelect={onChapterSelect}
      />
    ))}
  </div>
);

export default ChaptersList; 