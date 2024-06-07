import { Router } from "express";
import {
  getAllBooksController,
  getBookByIdController,
  searchBooksController,
  getBooksPaginatedController,
  addBookController,
  updateBookController,
  deleteBookController,
  addCommentController,
  updateCommentController,
  deleteCommentController,
  getCommentsPaginatedController,
  getCommentsByBookIdController,
} from "../controllers/booksController";
import authenticateJWT from "../middlewares/auth";

const router = Router();

router.get("/books", getAllBooksController);
router.get("/books/paginated", getBooksPaginatedController);
router.get("/books/search", searchBooksController);
router.get("/books/:id", getBookByIdController);
router.post("/books", authenticateJWT, addBookController);
router.put("/books/:id", authenticateJWT, updateBookController);
router.delete("/books/:id", authenticateJWT, deleteBookController);

router.get("/comments/:bookId", getCommentsByBookIdController);
router.get("/comments/paginated/:bookId", getCommentsPaginatedController);
router.post("/books/comments", authenticateJWT, addCommentController);
router.put("/comments/:id", authenticateJWT, updateCommentController);
router.delete("/comments/:id", authenticateJWT, deleteCommentController);

export default router;
