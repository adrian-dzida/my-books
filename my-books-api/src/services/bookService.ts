import { db } from "../utils/firebase";
import { Book } from "../models/book";
import { validateBook } from "../utils/bookValidation";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

export const getAllBooks = async (): Promise<Book[]> => {
  try {
    const q = query(collection(db, "books"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const books: Book[] = [];
    snapshot.forEach((doc) => {
      books.push({ id: doc.id, ...doc.data() } as Book);
    });

    return books;
  } catch (error) {
    console.error("Error fetching books: ", error);
    throw error;
  }
};

export const getBookById = async (id: string): Promise<Book | null> => {
  const docRef = doc(db, "books", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }
  return { id: docSnap.id, ...docSnap.data() } as Book;
};

export const searchBooks = async (queryStr: string): Promise<Book[]> => {
  const normalizedQuery = queryStr.toLowerCase();
  const booksCollection = collection(db, "books");
  const snapshot = await getDocs(booksCollection);
  const books: Book[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    const title = data.title.toLowerCase();
    const author = data.author.toLowerCase();
    if (title.includes(normalizedQuery) || author.includes(normalizedQuery)) {
      books.push({ id: doc.id, ...data } as Book);
    }
  });

  return books;
};

export const getBooksPaginated = async (
  page: number,
  limitNum: number
): Promise<Book[]> => {
  const books: Book[] = [];
  let lastVisible = null;

  try {
    if (page > 1) {
      const previousQuery = query(
        collection(db, "books"),
        orderBy("title"),
        limit((page - 1) * limitNum)
      );
      const previousSnapshot = await getDocs(previousQuery);
      if (!previousSnapshot.empty) {
        lastVisible = previousSnapshot.docs[previousSnapshot.docs.length - 1];
      } else {
        throw new Error("Book not found");
      }
    }

    const q = lastVisible
      ? query(
          collection(db, "books"),
          orderBy("title"),
          startAfter(lastVisible),
          limit(limitNum)
        )
      : query(collection(db, "books"), orderBy("title"), limit(limitNum));

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error("Book not found");
    }

    snapshot.forEach((doc) =>
      books.push({ id: doc.id, ...doc.data() } as Book)
    );
    return books;
  } catch (error) {
    console.error("Error fetching paginated books:", error);
    throw error;
  }
};

export const addBook = async (
  book: Book
): Promise<{ success: boolean; id?: string; error?: string }> => {
  const validation = validateBook(book);
  if (!validation.success) {
    return { success: false, error: validation.error };
  }
  try {
    const docRef = await addDoc(collection(db, "books"), {
      ...book,
      createdAt: new Date(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
};

export const updateBook = async (
  book: Book
): Promise<{ success: boolean; updatedBook?: Book | null; error?: string }> => {
  if (!book.id) {
    return { success: false, error: "Book ID is required" };
  }
  const validation = validateBook(book);
  if (!validation.success) {
    return { success: false, error: validation.error };
  }
  const { id, ...updatedBookData } = book;
  const docRef = doc(db, "books", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return { success: false, error: "Book not found" };
  }

  await updateDoc(docRef, updatedBookData);
  return { success: true, updatedBook: { id, ...updatedBookData } as Book };
};

export const deleteBook = async (id: string): Promise<void> => {
  const docRef = doc(db, "books", id);
  await deleteDoc(docRef);
};

export const bookExists = async (
  title: string,
  author: string
): Promise<boolean> => {
  const normalizedTitle = title.toLowerCase();
  const normalizedAuthor = author.toLowerCase();
  const q = query(
    collection(db, "books"),
    where("title", "==", normalizedTitle),
    where("author", "==", normalizedAuthor)
  );
  const snapshot = await getDocs(q);

  return !snapshot.empty;
};
