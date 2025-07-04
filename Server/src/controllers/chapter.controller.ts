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

export const insertChpapterContent = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { content } = req.body;
  const user = (req as any).user;
  const userRole = (req as any).userRole;

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

    let updateData: any = {};

    if (userRole === 'admin') {
      // Admin can directly update content
      updateData = { 
        content: result.trim(), 
        isTranslated: true,
        status: 'approved',
        reviewedBy: user.id,
        reviewedAt: new Date()
      };
    } else if (userRole === 'editor') {
      // Editor submits for approval
      updateData = {
        submittedContent: result.trim(),
        status: 'pending',
        submittedBy: user.id,
        submittedAt: new Date()
      };
    } else {
      res.status(403).json({
        success: false,
        message: 'Access denied. Only admins and editors can edit translations.'
      });
      return;
    }

    const chapter = await Chapter.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!chapter) {
      res.status(404).json({
        success: false,
        message: 'Chapter not found',
      });
      return;
    }

    const message = userRole === 'admin' 
      ? 'Chapter content updated successfully'
      : 'Chapter submitted for approval successfully';

    res.status(200).json({
      success: true,
      message,
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

// Get all pending translations (Admin only)
export const getPendingTranslations = async (req: Request, res: Response): Promise<void> => {
  try {
    const pendingChapters = await Chapter.find({ status: 'pending' })
      .populate('bookId', 'title slug')
      .populate('submittedBy', 'firstName lastName email')
      .sort({ submittedAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Pending translations fetched successfully',
      data: pendingChapters
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending translations',
      error: handleMongooseError(error)
    });
  }
};

// Approve translation (Admin only)
export const approveTranslation = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const user = (req as any).user;

  try {
    const chapter = await Chapter.findById(id);
    if (!chapter) {
      res.status(404).json({
        success: false,
        message: 'Chapter not found'
      });
      return;
    }

    if (chapter.status !== 'pending') {
      res.status(400).json({
        success: false,
        message: 'Chapter is not pending approval'
      });
      return;
    }

    if (!chapter.submittedContent) {
      res.status(400).json({
        success: false,
        message: 'No submitted content found'
      });
      return;
    }

    const updatedChapter = await Chapter.findByIdAndUpdate(
      id,
      {
        content: chapter.submittedContent,
        isTranslated: true,
        status: 'approved',
        reviewedBy: user.id,
        reviewedAt: new Date(),
        submittedContent: undefined // Clear the submitted content
      },
      { new: true }
    ).populate('submittedBy', 'firstName lastName email');

    res.status(200).json({
      success: true,
      message: 'Translation approved successfully',
      data: updatedChapter
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to approve translation',
      error: handleMongooseError(error)
    });
  }
};

// Reject translation (Admin only)
export const rejectTranslation = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { reason } = req.body;
  const user = (req as any).user;

  try {
    const chapter = await Chapter.findById(id);
    if (!chapter) {
      res.status(404).json({
        success: false,
        message: 'Chapter not found'
      });
      return;
    }

    if (chapter.status !== 'pending') {
      res.status(400).json({
        success: false,
        message: 'Chapter is not pending approval'
      });
      return;
    }

    const updatedChapter = await Chapter.findByIdAndUpdate(
      id,
      {
        status: 'rejected',
        reviewedBy: user.id,
        reviewedAt: new Date(),
        rejectionReason: reason || 'No reason provided'
      },
      { new: true }
    ).populate('submittedBy', 'firstName lastName email');

    res.status(200).json({
      success: true,
      message: 'Translation rejected successfully',
      data: updatedChapter
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to reject translation',
      error: handleMongooseError(error)
    });
  }
};