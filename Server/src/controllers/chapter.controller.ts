import { Request, Response } from 'express';
import Chapter from '../models/chapter.model';
import { handleMongooseError } from '../utils/mogoose.handler';
import Book from '../models/book.model';

// Create a new chapter
export const createChapter = async (req: Request, res: Response) => {
  const { title, content, bookId, index, hebrewTitle } = req.body;
    // Field validation
    if (!title || !content || !bookId || !index || !hebrewTitle) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }
    // Validate the book
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
  try {
    const chapter = await Chapter.create({ title, content, bookId, index, hebrewTitle });
    res.status(201).json({
      success: true,
      message: 'Chapter created successfully',
      data: chapter
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Chapter creation failed',
      error: handleMongooseError(error)
    });
  }
};

// Get all chapters
export const getAllChapters = async (req: Request, res: Response) => {
  try {
    const chapters = await Chapter.find();
    if (!chapters || chapters.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No chapters found',
        data: []
      });
    }
    res.status(200).json({
      success: true,
      message: 'Chapters fetched successfully',
      data: chapters
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Chapters fetching failed',
      error: handleMongooseError(error)
    });
  }
};

// Get a single chapter by ID
export const getChapterById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const chapter = await Chapter.findById(id);
    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: 'Chapter not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Chapter fetched successfully',
      data: chapter
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Chapter fetching failed',
      error: handleMongooseError(error)
    });
  }
};

// Update a chapter by ID
export const updateChapterById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, book } = req.body;

  try {
    const chapter = await Chapter.findByIdAndUpdate(id, { title, content, book }, { new: true });
    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: 'Chapter not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Chapter updated successfully',
      data: chapter
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Chapter updating failed',
      error: handleMongooseError(error)
    });
  }
};

export const insertChpapterContent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    // Step 1: Replace "--" with double break
    let processedContent = content.replace(/--/g, '<br/><br/>');

    // Step 2: Word-based punctuation-aware line breaking
    const words = processedContent.split(/\s+/);
    let result = '';
    let wordBuffer: string[] = [];
    let wordCount = 0;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      wordBuffer.push(word);
      wordCount++;

      if (wordCount >= 100) {
        const lastWord = word.trim();
        const endsWithPunctuation = /[.,!?]$/.test(lastWord);

        if (endsWithPunctuation) {
          result += wordBuffer.join(' ') + ' <br/> ';
          wordBuffer = [];
          wordCount = 0;
        }
      }
    }

    // Add remaining words
    if (wordBuffer.length > 0) {
      result += wordBuffer.join(' ');
    }

    const chapter = await Chapter.findByIdAndUpdate(
      id,
      { content: result.trim(), isTranslated: true },
      { new: true }
    );

    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: 'Chapter not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Chapter content updated successfully',
      data: chapter,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Chapter content updating failed',
      error: handleMongooseError(error),
    });
  }
};

// Delete a chapter by ID
export const deleteChapterById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const chapter = await Chapter.findByIdAndDelete(id);
    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: 'Chapter not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Chapter deleted successfully',
      data: {}
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Chapter deleting failed',
      error: handleMongooseError(error)
    });
  }
};

// Chapters Bulker
export const bulkInsertChapters = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const chaptersList = req.body;
  // Modify the chapters list to add the bookId to each chapter
  const chaptersWithBookId = chaptersList.map((chapter: any) => ({
    ...chapter,
    bookId: bookId
  }));
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    const chapters = await Chapter.insertMany(chaptersWithBookId);
    res.status(201).json({
      success: true,
      message: 'Chapters created successfully',
      data: chapters
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Chapters creation failed',
      error: handleMongooseError(error)
    });
  }
};