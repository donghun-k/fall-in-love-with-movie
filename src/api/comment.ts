import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import Comment from '../types/Comment';
import app from '../configs/firebase';

const db = getFirestore(app);
const commentsRef = collection(db, 'comments');

interface postCommentParams {
  movieId: number;
  userId: string;
  username: string;
  userProfileImage: string;
  content: string;
  rating: number;
}

export const postComment = async ({
  movieId,
  userId,
  username,
  userProfileImage,
  content,
  rating,
}: postCommentParams) => {
  const comment: Comment = {
    movieId,
    userId,
    username,
    userProfileImage,
    content,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isUpdated: false,
    likes: 0,
    rating,
  };
  const commentQuery = query(
    commentsRef,
    where('movieId', '==', movieId),
    where('userId', '==', userId)
  );
  const commentSnapshot = await getDocs(commentQuery);
  if (!commentSnapshot.empty) {
    throw new Error('Comment already exists.');
  }
  const docRef = await addDoc(commentsRef, comment);
  console.log('Comment written with ID: ', docRef.id);
};

// GET COMMENT
interface getMyCommentParams {
  movieId: number;
  userId: string;
}

export const getComment = async ({ movieId, userId }: getMyCommentParams) => {
  const commentQuery = query(
    commentsRef,
    where('movieId', '==', movieId),
    where('userId', '==', userId)
  );
  const commentSnapshot = await getDocs(commentQuery);
  if (commentSnapshot.empty) {
    throw new Error('Comment Not Found.');
  }
  const commentDoc = commentSnapshot.docs[0];
  return commentDoc.data() as Comment;
};

// DELETE COMMENT
interface deleteCommentParams {
  movieId: number;
  userId: string;
}

export const deleteComment = async ({
  movieId,
  userId,
}: deleteCommentParams) => {
  const commentQuery = query(
    commentsRef,
    where('movieId', '==', movieId),
    where('userId', '==', userId)
  );
  const commentSnapshot = await getDocs(commentQuery);
  if (commentSnapshot.empty) {
    throw new Error('Comment Not Found.');
  }
  const commentDoc = commentSnapshot.docs[0];
  await deleteDoc(commentDoc.ref);
  console.log('Comment successfully deleted!');
};

// UPDATE COMMENT
interface updateCommentParams {
  movieId: number;
  userId: string;
  username: string;
  userProfileImage: string;
  content: string;
}

export const updateComment = async ({
  movieId,
  userId,
  username,
  userProfileImage,
  content,
}: updateCommentParams) => {
  const commentQuery = query(
    commentsRef,
    where('movieId', '==', movieId),
    where('userId', '==', userId)
  );
  const commentSnapshot = await getDocs(commentQuery);
  if (commentSnapshot.empty) {
    throw new Error('Comment Not Found.');
  }
  const commentDoc = commentSnapshot.docs[0];
  await updateDoc(commentDoc.ref, {
    username,
    userProfileImage,
    content,
    updatedAt: Date.now(),
    isUpdated: true,
  });
  console.log('Comment successfully updated!');
};
