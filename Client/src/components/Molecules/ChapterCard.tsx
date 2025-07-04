import { Card, CardContent } from "../ui/card";
import StatusIcon from "../Atoms/StatusIcon";
import React, { useState } from "react";
import { Pen, Clock, CheckCircle, XCircle } from "lucide-react";
import IconButton from "../Atoms/IconButton";
import WriteChapterModal from "../Organisms/WriteChapterModal";
import { insertChapterContent } from "@/api/chapterService";
import { Chapter } from "@/types";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

interface ChapterCardProps {
  chapter: Chapter;
  onChapterSelect?: (chapter: Chapter) => void;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, onChapterSelect }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { role } = useSelector((state: RootState) => state.user);
  const isTranslated = chapter.isTranslated;
  const status = chapter.status || 'draft';

  const handleSubmit = async (content: string) => {
    await insertChapterContent(chapter._id, content);
    setModalOpen(false);
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return "Pending approval";
      case 'rejected':
        return "Translation rejected";
      default:
        return isTranslated ? chapter.content.slice(0, 150) + "..." : "This chapter has not been translated yet.";
    }
  };

  const canEdit = role === 'admin' || role === 'editor';
  const showEditButton = !isTranslated && canEdit;

  return (
    <Card
      className={`w-[300px] h-[280px] flex flex-col gap-4 rounded-xl border shadow-md p-6 flex-shrink-0 transition-all ${
        isTranslated
          ? "bg-white hover:shadow-lg cursor-pointer hover:scale-[1.02]"
          : status === 'pending'
          ? "bg-yellow-50 border-yellow-200"
          : status === 'rejected'
          ? "bg-red-50 border-red-200"
          : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
      }`}
      onClick={isTranslated ? () => onChapterSelect?.(chapter) : undefined}
    >
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">
          {chapter.index}. {chapter.title}
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          {isTranslated && <StatusIcon isTranslated={isTranslated} />}
        </div>
      </div>
      
      <CardContent className="text-sm line-clamp-4 p-0 flex-grow">
        {getStatusText()}
      </CardContent>

      {showEditButton && (
        <div className="mt-auto flex justify-center">
          <IconButton
            icon={<Pen />}
            label={role === 'admin' ? 'Edit' : 'Submit for Approval'}
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
            className="cursor-pointer opacity-100 hover:opacity-90 border border-green-500 text-green-600 rounded-full"
          />
        </div>
      )}

      {status === 'rejected' && chapter.rejectionReason && (
        <div className="mt-auto p-2 bg-red-100 rounded text-xs text-red-700">
          <strong>Rejected:</strong> {chapter.rejectionReason}
        </div>
      )}

      <WriteChapterModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={`${role === 'admin' ? 'Edit' : 'Submit'} Chapter: ${chapter.index}. ${chapter.title}`}
        onSubmit={handleSubmit}
      />
    </Card>
  );
};

export default ChapterCard;
