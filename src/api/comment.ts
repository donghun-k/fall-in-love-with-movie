import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
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
}

export const postComment = async ({
  movieId,
  userId,
  username,
  userProfileImage,
  content,
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
  };
  const docRef = await addDoc(commentsRef, comment);
  console.log('Document written with ID: ', docRef.id);
};

// GET MY COMMENT
interface getMyCommentParams {
  movieId: number;
  userId: string;
}

export const getMyComment = async ({ movieId, userId }: getMyCommentParams) => {
  const q = query(
    commentsRef,
    where('movieId', '==', movieId),
    where('userId', '==', userId)
  );
  const { docs } = await getDocs(q);
  if (docs.length > 0) {
    return docs[0].data() as Comment;
  }
  return null;
};
