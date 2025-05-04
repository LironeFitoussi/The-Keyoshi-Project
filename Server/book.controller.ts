import { Request, Response } from 'express';
import Book from '../models/book.model';
import { handleMongooseError } from '../../utils/mogoose.handler';

/**
 * @route POST /api/v1/books
 * @desc Create a new book
 * @access Public
 */
export const createBook = async (req: Request, res: Response) => {
  const { title, author, description, coverImage } = req.body;

  try {
    const book = await Book.create({ title, author, description, coverImage });
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Book creation failed',
      error: handleMongooseError(error),
    });
  }
};

/**
 * @route GET /api/v1/books
 * @desc Get all books
 * @access Public
 */
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      message: 'Books fetched successfully',
      data: books,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Books fetching failed',
      error: handleMongooseError(error),
    });
  }
};

/**
 * @route GET /api/v1/books/:id
 * @desc Get a book by id
 * @access Public
 */
export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id).populate('chapters');
    res.status(200).json({
      success: true,
      message: 'Book fetched successfully',
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false, 
      message: 'Book fetching failed',
      error: handleMongooseError(error),
    });
  }
};  

/**
 * @route GET /api/v1/books/slug/:slug
 * @desc Get a book by slug
 * @access Public
 */
export const getBookBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const book = await Book.findOne({ slug }).populate('chapters');
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Book fetched successfully',
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Book fetching failed',
      error: handleMongooseError(error),
    });
  }
};