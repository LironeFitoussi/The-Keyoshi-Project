// routes/book.routes.ts
import { Router, RequestHandler } from 'express';
import { createBook, getAllBooks, getBookById, getBookBySlug } from '../controllers/book.controller';
import { jwtCheck, getUserProfile } from '../middleware/auth0Middleware';

const bookRouter = Router();
/*
    @route POST /api/v1/books  
    @desc Create a new book
    @access Private (Admin only)
*/
bookRouter.post('/', jwtCheck, getUserProfile, createBook);

/*
    @route GET /api/v1/books
    @desc Get all books
    @access Public
*/
bookRouter.get('/', getAllBooks);

/*
    @route GET /api/v1/books/:id
    @desc Get a book by id
    @access Public
*/
bookRouter.get('/:id', getBookById);

/*
    @route GET /api/v1/books/slug/:slug
    @desc Get a book by slug
    @access Public
*/
bookRouter.get('/slug/:slug', getBookBySlug as RequestHandler);

export default bookRouter;