import { Chapter } from "@/types";
import axiosInstance from "./axiosInstance";

// Get all chapters for a book
export const getChaptersByBookId = async (bookId: string) => {
  const res = await axiosInstance.get(`/chapters/book/${bookId}`);
  return res.data;
};

// Get a chapter by id
export const getChapterById = async (chapterId: string) => {
  const res = await axiosInstance.get(`/chapters/${chapterId}`);
  return res.data;
};

// Create a chapter
export const createChapter = async (chapter: Chapter) => {
  const res = await axiosInstance.post(`/chapters`, chapter);
  return res.data;
};

// Insert Chapter Content 
export const insertChapterContent = async (chapterId: string, content: string) => {
  const res = await axiosInstance.patch(`/chapters/${chapterId}`, { content });
  return res.data;
};






