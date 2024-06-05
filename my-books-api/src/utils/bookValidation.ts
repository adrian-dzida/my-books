import { Book } from "../models/book";

interface ValidationResult {
  success: boolean;
  error?: string;
}

const isBase64 = (str: string) => {
  const base64Regex =
    /^(?:[A-Za-z0-9+\/]{4})*?(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
  return base64Regex.test(str);
};

export const validateBook = (book: Book): ValidationResult => {
  if (
    !book.title ||
    typeof book.title !== "string" ||
    book.title.length > 100
  ) {
    return { success: false, error: "Invalid title" };
  }

  if (
    !book.author ||
    typeof book.author !== "string" ||
    book.author.length > 100
  ) {
    return { success: false, error: "Invalid author" };
  }

  if (
    !book.year ||
    typeof book.year !== "number" ||
    book.year < 0 ||
    book.year > new Date().getFullYear()
  ) {
    return { success: false, error: "Invalid year" };
  }

  if (
    !book.coverBase64 ||
    typeof book.coverBase64 !== "string" ||
    !isBase64(book.coverBase64)
  ) {
    return { success: false, error: "Invalid cover image" };
  }

  if (
    !book.description ||
    typeof book.description !== "string" ||
    book.description.length > 500
  ) {
    return { success: false, error: "Invalid description" };
  }

  if (book.comments && !Array.isArray(book.comments)) {
    return { success: false, error: "Invalid comments" };
  }

  return { success: true };
};
