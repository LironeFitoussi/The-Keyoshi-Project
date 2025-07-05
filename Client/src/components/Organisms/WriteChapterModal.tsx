import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import WriteChapterForm from "@/components/Molecules/WriteChapterForm";

interface WriteChapterModalProps {
  title: string;
  onSubmit: (content: string) => Promise<void>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialContent?: string;
}

export default function WriteChapterModal({ title, onSubmit, open, onOpenChange, initialContent }: WriteChapterModalProps) {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (content: string) => {
    setLoading(true);
    try {
      await onSubmit(content);
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <WriteChapterForm onSubmit={handleFormSubmit} loading={loading} initialContent={initialContent} />
      </DialogContent>
    </Dialog>
  );
}
