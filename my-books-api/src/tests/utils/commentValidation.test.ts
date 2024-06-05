import { describe, test, expect } from 'vitest';
import { validateComment } from '../../utils/commentValidation';
import { Comment } from '../../models/comment';

describe('Comment Validation Tests', () => {
  test('should validate a correct comment', () => {
    const comment: Comment = {
      bookId: 'book123',
      userEmail: 'user@example.com',
      text: 'This is a valid comment',
      rating: 4,
    };

    expect(validateComment(comment)).toEqual({ success: true });
  });

  test('should invalidate a comment with invalid book ID', () => {
    const comment: Comment = {
      bookId: '',
      userEmail: 'user@example.com',
      text: 'This is a valid comment',
      rating: 4,
    };

    expect(validateComment(comment)).toEqual({ success: false, error: 'Invalid book ID' });
  });

  test('should invalidate a comment with invalid email', () => {
    const comment: Comment = {
      bookId: 'book123',
      userEmail: 'invalid-email',
      text: 'This is a valid comment',
      rating: 4,
    };

    expect(validateComment(comment)).toEqual({ success: false, error: 'Invalid user email' });
  });

  test('should invalidate a comment with too long text', () => {
    const comment: Comment = {
      bookId: 'book123',
      userEmail: 'user@example.com',
      text: 'A'.repeat(501),
      rating: 4,
    };

    expect(validateComment(comment)).toEqual({ success: false, error: 'Invalid text' });
  });

  test('should invalidate a comment with invalid rating', () => {
    const comment: Comment = {
      bookId: 'book123',
      userEmail: 'user@example.com',
      text: 'This is a valid comment',
      rating: 6,
    };

    expect(validateComment(comment)).toEqual({ success: false, error: 'Invalid rating' });
  });
});
