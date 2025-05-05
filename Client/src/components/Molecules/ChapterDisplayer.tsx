// components/TextCard.tsx
import React, { useState } from "react";
import ReadChapterModal from "./ReadChapterModal";
import { FaExpandAlt } from "react-icons/fa";

interface IChapterDisplayerProps {
  title: string;
  text: string;
}

const ChapterDisplayer: React.FC<IChapterDisplayerProps> = ({
  title,
  text,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="rounded-2xl shadow-md p-6 bg-white w-full max-h-[50vh] overflow-y-auto">
      <div className="flex justify-end">
        <FaExpandAlt
          className="text-gray-600 cursor-pointer"
          onClick={() => setModalOpen(true)}
        />
      </div>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p
        className="text-gray-600"
        dangerouslySetInnerHTML={{ __html: text }}
      ></p>
      <ReadChapterModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={title}
        content={text}
      />
    </div>
  );
};

export default ChapterDisplayer;
