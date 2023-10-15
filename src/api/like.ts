import app from '../configs/firebase';
import {
  arrayRemove,
  arrayUnion,
  collection,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

const db = getFirestore(app);
const commentsRef = collection(db, 'comments');

// POST LIKE
interface addLikeParams {
  commentAuthorId: string;
  movieId: number;
  userId: string;
}

export const addLike = async ({
  commentAuthorId,
  movieId,
  userId,
}: addLikeParams) => {
  if (commentAuthorId === userId) {
    throw new Error('You cannot like your own comment.');
  }
  const commentQuery = query(
    commentsRef,
    where('movieId', '==', movieId),
    where('userId', '==', commentAuthorId)
  );
  const commentSnapshot = await getDocs(commentQuery);

  if (commentSnapshot.empty) {
    throw new Error('Comment does not exist.');
  }

  const commentDoc = commentSnapshot.docs[0];
  await updateDoc(commentDoc.ref, {
    likes: arrayUnion(userId),
    likeCount: commentDoc.data().likes.length + 1,
  });
  console.log('Like added successfully.');
};

// DELETE LIKE
interface deleteLikeParams {
  commentAuthorId: string;
  movieId: number;
  userId: string;
}

export const deleteLike = async ({
  commentAuthorId,
  movieId,
  userId,
}: deleteLikeParams) => {
  const commentQuery = query(
    commentsRef,
    where('movieId', '==', movieId),
    where('userId', '==', commentAuthorId)
  );
  const commentSnapshot = await getDocs(commentQuery);

  if (commentSnapshot.empty) {
    throw new Error('Comment does not exist.');
  }

  const commentDoc = commentSnapshot.docs[0];
  await updateDoc(commentDoc.ref, {
    likes: arrayRemove(userId),
    likeCount: commentDoc.data().likes.length - 1,
  });
  console.log('Like deleted successfully.');
};
