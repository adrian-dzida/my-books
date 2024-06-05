import { Router } from 'express';
import {
  getAllBooksController,
  getBookByIdController,
  addBookController,
  updateBookController,
  deleteBookController,
  addCommentController,
  updateCommentController,
  deleteCommentController
} from '../controllers/booksController';
import authenticateJWT from '../middlewares/auth';

const router = Router();

router.get('/books', authenticateJWT, getAllBooksController);
router.get('/books/:id', authenticateJWT, getBookByIdController);
router.post('/books', authenticateJWT, addBookController);
router.put('/books/:id', authenticateJWT, updateBookController)
router.delete('/books/:id', authenticateJWT, deleteBookController);

router.post('/books/:bookId/comments', authenticateJWT, addCommentController);
router.put('/comments/:id', authenticateJWT, updateCommentController);
router.delete('/comments/:id', authenticateJWT, deleteCommentController);

export default router;
