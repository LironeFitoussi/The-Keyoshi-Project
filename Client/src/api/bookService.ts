// src/services/bookService.ts
import axiosInstance from '@/api/axiosInstance';

export const getAllBooks = async () => {
  try {
    const res = await axiosInstance.get('/books');
    if (!res.data || !res.data.data) {
      throw new Error('Invalid response format from API');
    }
    console.log('Books data received:', res.data);
    return res.data.data;
  } catch (error) {
    console.error('Failed to fetch books:', error);
    throw error;
  }
};

export const getBookBySlug = async (slug: string) => {
  try {
    const res = await axiosInstance.get(`/books/slug/${slug}`);
    if (!res.data || !res.data.data) {
      throw new Error('Invalid response format from API');
    }
    // console.log('Book data received:', res.data);
    return res.data.data;
  } catch (error) {
    console.error(`Failed to fetch book with slug ${slug}:`, error);
    throw error;
  }
};

