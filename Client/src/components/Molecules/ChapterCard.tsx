import { Card, CardContent } from "../ui/card";
import StatusIcon from "../Atoms/StatusIcon";
import React, { useState } from "react";
import { Pen } from "lucide-react";
import { MdDelete } from "react-icons/md";
import IconButton from "../Atoms/IconButton";
import WriteChapterModal from "../Organisms/WriteChapterModal";
import { insertChapterContent, dropTranslation } from "@/api/chapterService";
import { Chapter } from "@/types";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ChapterCardProps {
  chapter: Chapter;
  onChapterSelect?: (chapter: Chapter) => void;
  onChapterUpdate?: (updatedChapter: Chapter) => void;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, onChapterSelect, onChapterUpdate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { role } = useSelector((state: RootState) => state.user);
  const isTranslated = chapter.isTranslated;
  const status = chapter.status || 'draft';
  const [dropLoading, setDropLoading] = useState(false);
  const [showDropConfirm, setShowDropConfirm] = useState(false);

  const handleSubmit = async (content: string) => {
    await insertChapterContent(chapter._id, content);
    setModalOpen(false);
    // Optimistically update the chapter preview
    if (onChapterUpdate) {
      onChapterUpdate({ ...chapter, content, isTranslated: true, status: 'pending' });
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

  const showEditButton = (role === 'admin') || (role === 'editor' && !isTranslated);

  const handleDropTranslation = async () => {
    setDropLoading(true);
    try {
      await dropTranslation(chapter._id);
      // Optimistically update the chapter preview
      if (onChapterUpdate) {
        onChapterUpdate({
          ...chapter,
          isTranslated: false,
          content: '',
          status: 'draft',
        });
      }
    } finally {
      setDropLoading(false);
      setShowDropConfirm(false);
    }
  };

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
          {/* {getStatusIcon()} */}
          {isTranslated && <StatusIcon isTranslated={isTranslated} />}
        </div>
      </div>
      
      <CardContent className="text-sm line-clamp-4 p-0 flex-grow">
        {getStatusText()}
      </CardContent>

      {showEditButton && (
        <div className="mt-auto flex justify-center gap-6">
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
          {role === 'admin' && isTranslated && (
            <IconButton
              icon={<MdDelete />}
              label=""
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setShowDropConfirm(true);
              }}
              className="ml-2 bg-white text-red-600 border border-red-200 hover:bg-red-50 rounded-full"
              disabled={dropLoading}
            />
          )}
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
        initialContent={chapter.content}
      />

      {/* Drop Translation Confirmation Modal */}
      <Dialog open={showDropConfirm} onOpenChange={setShowDropConfirm}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle>Drop Translation?</DialogTitle>
          </DialogHeader>
          <div className="py-2 text-sm">Are you sure you want to drop this translation? This cannot be undone.</div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
              onClick={() => setShowDropConfirm(false)}
              disabled={dropLoading}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDropTranslation}
              disabled={dropLoading}
            >
              {dropLoading ? 'Dropping...' : 'Drop'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ChapterCard;
