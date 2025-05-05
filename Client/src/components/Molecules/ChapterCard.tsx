import { Card, CardContent } from "../ui/card";
import StatusIcon from "../Atoms/StatusIcon";
import React, { useState } from "react";
import { Pen } from "lucide-react";
import IconButton from "../Atoms/IconButton";
import WriteChapterModal from "../Organisms/WriteChapterModal";

interface ChapterCardProps {
  chapter: {
    _id: string;
    index: number;
    title: string;
    content: string;
    isTranslated: boolean;
  };
  onClick?: () => void;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, onClick }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const isTranslated = chapter.isTranslated;
  return (
    <Card
      className={`min-w-[300px] flex flex-col gap-2 rounded-xl border shadow-md p-4 flex-shrink-0 transition-opacity ${
        isTranslated
          ? "bg-white hover:shadow-lg cursor-pointer"
          : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
      }`}
      onClick={isTranslated ? onClick : undefined}
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
          ? chapter.content
          : "This chapter has not been translated yet."}
      </CardContent>
      <WriteChapterModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Translate Chapter"
        onSubmit={async (content: string) => {
          console.log(content);
          setModalOpen(false);
        }}
      />
    </Card>
  );
};

export default ChapterCard;
