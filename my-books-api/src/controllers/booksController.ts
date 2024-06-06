import { Request, Response } from "express";
import {
  getAllBooks,
  getBookById,
  getBooksPaginated,
  searchBooks,
  addBook,
  updateBook,
  deleteBook,
  bookExists,
} from "../services/bookService";
import { Book } from "../models/book";
import {
  addComment,
  updateComment,
  deleteComment,
  getCommentsByBookId,
  getCommentsPaginated,
} from "../services/commentService";
import { Comment } from "../models/comment";

export const getAllBooksController = async (req: Request, res: Response) => {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getBookByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await getBookById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const searchBooksController = async (req: Request, res: Response) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }
  try {
    const books = await searchBooks(query as string);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getBooksPaginatedController = async (
  req: Request,
  res: Response
) => {
  const { page, limit } = req.query;
  const pageNum = parseInt(page as string, 10) || 1;
  const limitNum = parseInt(limit as string, 10) || 10;

  try {
    const books = await getBooksPaginated(pageNum, limitNum);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const addBookController = async (req: Request, res: Response) => {
  const { title, author, year, coverBase64, description } = req.body;
  try {
    const normalizedTitle = title.toLowerCase();
    const normalizedAuthor = author.toLowerCase();
    const exists = await bookExists(normalizedTitle, normalizedAuthor);

    if (exists) {
      return res
        .status(400)
        .json({ error: "Book with this title and author already exists" });
    }

    const book: Book = {
      title: normalizedTitle,
      author: normalizedAuthor,
      year,
      coverBase64,
      description,
    };
    const result = await addBook(book);

    if (!result.success) {
      return res.status(422).json({ error: result.error });
    }

    res.status(201).json({ id: result.id });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateBookController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, year, coverBase64, description } = req.body;
  try {
    const book: Book = { id, title, author, year, coverBase64, description };
    const result = await updateBook(book);

    if (!result.success) {
      return res.status(422).json({ error: result.error });
    }

    res.status(200).json(result.updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteBookController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteBook(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const addCommentController = async (req: Request, res: Response) => {
  const comment: Comment = req.body;
  try {
    const result = await addComment(comment);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    res.status(201).json({ id: result.id });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateCommentController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const comment: Partial<Comment> = req.body;
  try {
    const result = await updateComment(id, comment);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteCommentController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteComment(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getCommentsByBookIdController = async (
  req: Request,
  res: Response
) => {
  const { bookId } = req.params;
  try {
    const comments = await getCommentsByBookId(bookId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getCommentsPaginatedController = async (
  req: Request,
  res: Response
) => {
  const { bookId } = req.params;
  const { page, limit } = req.query;
  const pageNum = parseInt(page as string, 10) || 1;
  const limitNum = parseInt(limit as string, 10) || 10;

  try {
    const comments = await getCommentsPaginated(bookId, pageNum, limitNum);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
