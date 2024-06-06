import { describe, test, expect } from "vitest";
import { validateBook } from "../../utils/bookValidation";
import { Book } from "../../models/book";

describe("Validation Tests", () => {
  test("should validate a correct book object", () => {
    const book: Book = {
      title: "Valid Title",
      author: "Valid Author",
      year: 2023,
      coverBase64:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" +
        "AAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
        "//8/w38GIAXDIBKE0DHxgljNBAAO" +
        "9TXL0Y4OHwAAAABJRU5ErkJggg==",
      description: "Valid description up to 500 characters.",
      comments: [],
    };

    expect(validateBook(book)).toEqual({ success: true });
  });

  test("should invalidate a book with too long title", () => {
    const book: Book = {
      title: "A".repeat(101),
      author: "Valid Author",
      year: 2023,
      coverBase64:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" +
        "AAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
        "//8/w38GIAXDIBKE0DHxgljNBAAO" +
        "9TXL0Y4OHwAAAABJRU5ErkJggg==",
      description: "Valid description up to 500 characters.",
      comments: [],
    };

    expect(validateBook(book)).toEqual({
      success: false,
      error: "Invalid title",
    });
  });

  test("should invalidate a book with too long author name", () => {
    const book: Book = {
      title: "Valid Title",
      author: "A".repeat(101),
      year: 2023,
      coverBase64:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" +
        "AAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
        "//8/w38GIAXDIBKE0DHxgljNBAAO" +
        "9TXL0Y4OHwAAAABJRU5ErkJggg==",
      description: "Valid description up to 500 characters.",
      comments: [],
    };

    expect(validateBook(book)).toEqual({
      success: false,
      error: "Invalid author",
    });
  });

  test("should invalidate a book with an invalid year", () => {
    const book: Book = {
      title: "Valid Title",
      author: "Valid Author",
      year: 3000,
      coverBase64:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" +
        "AAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
        "//8/w38GIAXDIBKE0DHxgljNBAAO" +
        "9TXL0Y4OHwAAAABJRU5ErkJggg==",
      description: "Valid description up to 500 characters.",
      comments: [],
    };

    expect(validateBook(book)).toEqual({
      success: false,
      error: "Invalid year",
    });
  });

  test("should invalidate a book with invalid cover image", () => {
    const book: Book = {
      title: "Valid Title",
      author: "Valid Author",
      year: 2023,
      coverBase64: "invalid-base64-string",
      description: "Valid description up to 500 characters.",
      comments: [],
    };

    expect(validateBook(book)).toEqual({
      success: false,
      error: "Invalid cover image",
    });
  });

  test("should invalidate a book with cover image exceeding 2MB", () => {
    const book: Book = {
      title: "Valid Title",
      author: "Valid Author",
      year: 2023,
      coverBase64:
        "data:image/png;base64," + "a".repeat(2 * 1024 * 1024 * (4 / 3) + 1),
      description: "Valid description up to 500 characters.",
      comments: [],
    };

    expect(validateBook(book)).toEqual({
      success: false,
      error: "Invalid cover image",
    });
  });

  test("should invalidate a book with cover image of wrong format", () => {
    const book: Book = {
      title: "Valid Title",
      author: "Valid Author",
      year: 2023,
      coverBase64: "data:text/plain;base64,dGVzdCBzdHJpbmc=",
      description: "Valid description up to 500 characters.",
      comments: [],
    };

    expect(validateBook(book)).toEqual({
      success: false,
      error: "Invalid cover image",
    });
  });

  test("should invalidate a book with too long description", () => {
    const book: Book = {
      title: "Valid Title",
      author: "Valid Author",
      year: 2023,
      coverBase64:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" +
        "AAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
        "//8/w38GIAXDIBKE0DHxgljNBAAO" +
        "9TXL0Y4OHwAAAABJRU5ErkJggg==",
      description: "A".repeat(501),
      comments: [],
    };

    expect(validateBook(book)).toEqual({
      success: false,
      error: "Invalid description",
    });
  });
});
