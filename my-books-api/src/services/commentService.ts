import { db } from "../utils/firebase";
import { Comment } from "../models/comment";
import { validateComment } from "../utils/commentValidation";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

export const addComment = async (
  comment: Comment
): Promise<{ success: boolean; id?: string; error?: string }> => {
  const validation = validateComment(comment);
  if (!validation.success) {
    return { success: false, error: validation.error };
  }
  try {
    const docRef = await addDoc(collection(db, "comments"), comment);
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: "Something went wrong." };
  }
};

export const updateComment = async (
  id: string,
  comment: Partial<Comment>
): Promise<{ success: boolean; error?: string }> => {
  if (comment.rating !== undefined) {
    const validation = validateComment({
      ...comment,
      bookId: "dummyBookId",
      userEmail: "dummy@example.com",
      text: "dummy",
    } as Comment);
    if (!validation.success) {
      return { success: false, error: validation.error };
    }
  }
  try {
    const docRef = doc(db, "comments", id);
    await updateDoc(docRef, comment);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong." };
  }
};

export const deleteComment = async (id: string): Promise<void> => {
  const docRef = doc(db, "comments", id);
  await deleteDoc(docRef);
};

export const getCommentsByBookId = async (
  bookId: string
): Promise<Comment[]> => {
  const q = query(collection(db, "comments"), where("bookId", "==", bookId));
  const snapshot = await getDocs(q);
  const comments: Comment[] = [];
  snapshot.forEach((doc) =>
    comments.push({ id: doc.id, ...doc.data() } as Comment)
  );
  return comments;
};

export const getCommentsPaginated = async (
  bookId: string,
  page: number,
  limitNum: number
): Promise<Comment[]> => {
  const comments: Comment[] = [];
  const offset = (page - 1) * limitNum;
  let q;

  if (offset > 0) {
    const initialQuery = query(
      collection(db, "comments"),
      where("bookId", "==", bookId),
      orderBy("timestamp"),
      limit(offset)
    );
    const initialSnapshot = await getDocs(initialQuery);
    const lastVisible = initialSnapshot.docs[initialSnapshot.docs.length - 1];

    q = query(
      collection(db, "comments"),
      where("bookId", "==", bookId),
      orderBy("timestamp"),
      startAfter(lastVisible),
      limit(limitNum)
    );
  } else {
    q = query(
      collection(db, "comments"),
      where("bookId", "==", bookId),
      orderBy("timestamp"),
      limit(limitNum)
    );
  }

  const snapshot = await getDocs(q);

  snapshot.forEach((doc) =>
    comments.push({ id: doc.id, ...doc.data() } as Comment)
  );
  return comments;
};
