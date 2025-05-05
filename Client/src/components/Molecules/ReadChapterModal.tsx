import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface ReadChapterModalProps {
  open: boolean
  onClose: () => void
  title: string
  content: string
}

export default function ReadChapterModal({
  open,
  onClose,
  title,
  content,
}: ReadChapterModalProps) {
  const [fontSize, setFontSize] = useState(16)
  const [isDark, setIsDark] = useState(false)

  const increaseFont = () => setFontSize((f) => Math.min(f + 2, 30))
  const decreaseFont = () => setFontSize((f) => Math.max(f - 2, 12))
  const toggleTheme = () => setIsDark((d) => !d)

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isDark ? "bg-zinc-900" : "bg-white"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-opacity"
        onClick={onClose}
      />
      {/* Modal Content */}
      <div
        className={`relative z-10 w-full h-full flex flex-col animate-pop ${
          isDark ? "text-white" : "text-black"
        }`}
        style={{
          animation: "pop 0.3s cubic-bezier(.4,2,.6,1) both",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6">
          <h2 className="text-3xl font-bold">{title}</h2>
          <Button variant="ghost" onClick={onClose} className="text-2xl">✕</Button>
        </div>
        {/* Controls */}
        <div className="flex justify-end gap-2 px-6 mb-4">
          <Button variant="outline" onClick={decreaseFont}>–A</Button>
          <Button variant="outline" onClick={increaseFont}>+A</Button>
          <Button variant="outline" onClick={toggleTheme}>
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </Button>
        </div>
        {/* Content */}
        <div
          className="flex-1 overflow-y-auto px-6 pb-6"
          style={{ fontSize: `${fontSize}px`, lineHeight: "1.75" }}
        >
          <div
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      </div>
      {/* Pop animation keyframes */}
      <style>{`
        @keyframes pop {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
  