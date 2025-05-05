import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface WriteChapterFormProps {
  onSubmit: (content: string) => Promise<void>;
  loading?: boolean;
}

export default function WriteChapterForm({ onSubmit, loading }: WriteChapterFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!content.trim()) return;
    await onSubmit(content);
    setContent(""); // reset after submit
  };

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        placeholder="Write your chapter here..."
        className="min-h-[200px]"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={loading || !content.trim()}>
        {loading ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
