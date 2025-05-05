// components/TextCard.tsx
import React from "react";

interface IChapterDisplayerProps {
  title: string;
  text: string;
}

const ChapterDisplayer: React.FC<IChapterDisplayerProps> = ({ title, text }) => {
  return (
    <div className="rounded-2xl shadow-md p-6 bg-white w-full max-h-[50vh] overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">{title}</h2>
      <p className="text-gray-600">{text}</p>
    </div>
  );
};

export default ChapterDisplayer;
