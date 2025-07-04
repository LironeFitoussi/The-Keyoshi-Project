import { Chapter } from "@/types";
import ChapterCard from "../Molecules/ChapterCard";
import React from "react";

interface ChaptersListProps {
  chapters: Chapter[];
  onChapterSelect?: (chapter: Chapter) => void;
}

const ChaptersList: React.FC<ChaptersListProps> = ({ chapters, onChapterSelect }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
    {[...chapters]
      .sort((a, b) => a.index - b.index)
      .map((chapter) => (
        <ChapterCard
          key={chapter._id}
          chapter={chapter}
          onChapterSelect={onChapterSelect}
        />
      ))}
  </div>
);

export default ChaptersList; 