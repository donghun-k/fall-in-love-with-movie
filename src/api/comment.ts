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
    likes: 0,
  };
  const docRef = await addDoc(commentsRef, comment);
  console.log('Document written with ID: ', docRef.id);
};

// GET COMMENT
interface getMyCommentParams {
  movieId: number;
  userId: string;
}

export const getComment = async ({ movieId, userId }: getMyCommentParams) => {
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

// DELETE COMMENT
interface deleteCommentParams {
  movieId: number;
  userId: string;
}

export const deleteComment = async ({
  movieId,
  userId,
}: deleteCommentParams) => {
  const q = query(
    commentsRef,
    where('movieId', '==', movieId),
    where('userId', '==', userId)
  );
  const { docs } = await getDocs(q);
  if (docs.length > 0) {
    docs.forEach((doc) => {
      deleteDoc(doc.ref);
    });
    console.log('Document successfully deleted!');
  }
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
  const q = query(
    commentsRef,
    where('movieId', '==', movieId),
    where('userId', '==', userId)
  );
  const { docs } = await getDocs(q);
  if (docs.length > 0) {
    updateDoc(docs[0].ref, {
      username,
      userProfileImage,
      content,
      updatedAt: Date.now(),
      isUpdated: true,
    });
    console.log('Document successfully updated!');
  }
};
