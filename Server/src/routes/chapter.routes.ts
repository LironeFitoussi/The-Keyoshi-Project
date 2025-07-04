import { Router, Request, Response, NextFunction } from 'express';
import {
  createChapter,
  getAllChapters,
  getChapterById,
  updateChapterById,
  deleteChapterById,
  insertChpapterContent,
  bulkInsertChapters,
  getPendingTranslations,
  approveTranslation,
  rejectTranslation
} from '../controllers/chapter.controller';
import { validateBody } from '../utils/healthyBody.middlware';
import { jwtCheck, getUserProfile } from '../middleware/auth0Middleware';
import { requireRole, requireAnyRole } from '../middleware/roleMiddleware';

const router = Router();

interface RequestHandler {
    (req: Request, res: Response, next: NextFunction): Promise<void>;
}

// Admin-only routes
router.post('/', jwtCheck, getUserProfile, requireRole('admin'), validateBody, createChapter as RequestHandler);
router.put('/:id', jwtCheck, getUserProfile, requireRole('admin'), validateBody, updateChapterById as RequestHandler);
router.delete('/:id', jwtCheck, getUserProfile, requireRole('admin'), deleteChapterById as RequestHandler);
router.post('/bulk/:bookId', jwtCheck, getUserProfile, requireRole('admin'), validateBody, bulkInsertChapters as RequestHandler);

// Admin approval routes
router.get('/pending', jwtCheck, getUserProfile, requireRole('admin'), getPendingTranslations as RequestHandler);
router.post('/approve/:id', jwtCheck, getUserProfile, requireRole('admin'), approveTranslation as RequestHandler);
router.post('/reject/:id', jwtCheck, getUserProfile, requireRole('admin'), validateBody, rejectTranslation as RequestHandler);

// Editor and Admin routes (translation editing)
router.patch('/:id', jwtCheck, getUserProfile, requireAnyRole(['admin', 'editor']), validateBody, insertChpapterContent as RequestHandler);

// Public routes
router.get('/', getAllChapters as RequestHandler);
router.get('/:id', getChapterById as RequestHandler);

export default router;
