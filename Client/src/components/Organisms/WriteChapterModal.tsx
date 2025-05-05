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
}

export default function WriteChapterModal({ title, onSubmit, open, onOpenChange }: WriteChapterModalProps) {
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
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <WriteChapterForm onSubmit={handleFormSubmit} loading={loading} />
      </DialogContent>
    </Dialog>
  );
}
