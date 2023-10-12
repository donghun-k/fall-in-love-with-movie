import { addDoc, collection, getFirestore } from 'firebase/firestore';
import Comment from '../types/Comment';
import app from '../configs/firebase';

const db = getFirestore(app);
const commentsRef = collection(db, 'comments');

interface postCommentParams {
  movieId: number;
  userId: string;
  username: string;
  userProfileImage: string;
  rating: number;
  content: string;
}

export const postComment = async ({
  movieId,
  userId,
  username,
  userProfileImage,
  rating,
  content,
}: postCommentParams) => {
  const comment: Comment = {
    movieId,
    userId,
    username,
    userProfileImage,
    rating,
    content,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isUpdated: false,
    likes: 0,
  };
  const docRef = await addDoc(commentsRef, comment);
  console.log('Document written with ID: ', docRef.id);
};
