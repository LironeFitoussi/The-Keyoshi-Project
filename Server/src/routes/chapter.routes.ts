import { Router, Request, Response, NextFunction } from 'express';
import {
  createChapter,
  getAllChapters,
  getChapterById,
  updateChapterById,
  deleteChapterById,
  insertChpapterContent,
  bulkInsertChapters
} from '../controllers/chapter.controller';
import { validateBody } from '../utils/healthyBody.middlware';

const router = Router();

interface RequestHandler {
    (req: Request, res: Response, next: NextFunction): Promise<void>;
}

router.post('/', validateBody, createChapter as RequestHandler);
router.get('/', getAllChapters as RequestHandler);
router.get('/:id', getChapterById as RequestHandler);
router.put('/:id', validateBody, updateChapterById as RequestHandler);
router.patch('/:id', validateBody, insertChpapterContent as RequestHandler);
router.delete('/:id', deleteChapterById as RequestHandler);
router.post('/bulk/:bookId', validateBody, bulkInsertChapters as RequestHandler);
export default router;
