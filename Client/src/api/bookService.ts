// src/services/bookService.ts
import axiosInstance from '@/api/axiosInstance';
import axios from 'axios';

export const getAllBooks = async () => {
  try {
    const res = await axiosInstance.get('/books');
    if (!res.data || !res.data.data) {
      throw new Error('Invalid response format from API');
    }
    // console.log('Books data received:', res.data);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error('Unable to fetch books. Please check your internet connection.');
      }
      if (error.response.status === 404) {
        return []; // Return empty array if no books found
      }
      throw new Error(`Failed to fetch books: ${error.response.data?.message || error.message}`);
    }
    throw new Error('An unexpected error occurred while fetching books.');
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
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error('Unable to fetch book details. Please check your internet connection.');
      }
      if (error.response.status === 404) {
        throw new Error('Book not found.');
      }
      throw new Error(`Failed to fetch book: ${error.response.data?.message || error.message}`);
    }
    throw new Error('An unexpected error occurred while fetching the book.');
  }
};

