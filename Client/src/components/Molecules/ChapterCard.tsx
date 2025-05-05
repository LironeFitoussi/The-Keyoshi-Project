import { Card, CardContent } from "../ui/card";
import StatusIcon from "../Atoms/StatusIcon";
import React, { useState } from "react";
import { Pen } from "lucide-react";
import IconButton from "../Atoms/IconButton";
import WriteChapterModal from "../Organisms/WriteChapterModal";
import { insertChapterContent } from "@/api/chapterService";
import { Chapter } from "@/types";

interface ChapterCardProps {
  chapter: Chapter;
  onChapterSelect?: (chapter: Chapter) => void;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, onChapterSelect }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const isTranslated = chapter.isTranslated;

  const handleSubmit = async (content: string) => {
    await insertChapterContent(chapter._id, content);
    setModalOpen(false);
  };

  return (
    <Card
      className={`min-w-[300px] flex flex-col gap-2 rounded-xl border shadow-md p-4 flex-shrink-0 transition-opacity ${
        isTranslated
          ? "bg-white hover:shadow-lg cursor-pointer"
          : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
      }`}
      onClick={isTranslated ? () => onChapterSelect?.(chapter) : undefined}
    >
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">
          {chapter.index}. {chapter.title}
        </div>
        {isTranslated ? (
          <StatusIcon isTranslated={isTranslated} />
        ) : (
          <IconButton
            icon={<Pen />}
            label="Translate"
            variant="secondary"
            size="sm"
            onClick={() => {
              // TODO: Add translation logic/modal here
              setModalOpen(true);
            }}
            className="cursor-pointer opacity-100 hover:opacity-90 border border-green-500 text-green-600 rounded-full"
          />
        )}
      </div>
      <CardContent className="text-sm line-clamp-4 p-0">
        {isTranslated
          ? chapter.content.slice(0, 50) + "..."
          : "This chapter has not been translated yet."}
      </CardContent>
      <WriteChapterModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={`Translate Chapter: ${chapter.index}. ${chapter.title}`}
        onSubmit={handleSubmit}
      />
    </Card>
  );
};

export default ChapterCard;
