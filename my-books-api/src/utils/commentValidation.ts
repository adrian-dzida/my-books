import { Comment } from "../models/comment";
import ValidationResult from "../interfaces/IValidationResult";

export const validateComment = (comment: Comment): ValidationResult => {
  if (!comment.bookId || typeof comment.bookId !== "string") {
    return { success: false, error: "Invalid book ID" };
  }

  if (
    !comment.userEmail ||
    typeof comment.userEmail !== "string" ||
    !/\S+@\S+\.\S+/.test(comment.userEmail)
  ) {
    return { success: false, error: "Invalid user email" };
  }

  if (
    !comment.text ||
    typeof comment.text !== "string" ||
    comment.text.length > 500
  ) {
    return { success: false, error: "Invalid text" };
  }

  if (
    typeof comment.rating !== "number" ||
    comment.rating < 0 ||
    comment.rating > 5
  ) {
    return { success: false, error: "Invalid rating" };
  }

  return { success: true };
};
