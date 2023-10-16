import {
  DocumentReference,
  arrayRemove,
  arrayUnion,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

// POST LIKE
interface addLikeParams {
  commentRef: DocumentReference;
  userId: string;
}

export const addLike = async ({ commentRef, userId }: addLikeParams) => {
  const commentDoc = await getDoc(commentRef);

  if (!commentDoc.exists()) {
    throw new Error('Comment does not exist.');
  }

  await updateDoc(commentDoc.ref, {
    likes: arrayUnion(userId),
    likeCount: commentDoc.data().likes.length + 1,
  });
  console.log('Like added successfully.');
};

// DELETE LIKE
interface deleteLikeParams {
  commentRef: DocumentReference;
  userId: string;
}

export const deleteLike = async ({ commentRef, userId }: deleteLikeParams) => {
  const commentDoc = await getDoc(commentRef);

  if (!commentDoc.exists()) {
    throw new Error('Comment does not exist.');
  }

  await updateDoc(commentDoc.ref, {
    likes: arrayRemove(userId),
    likeCount: commentDoc.data().likes.length - 1,
  });
  console.log('Like deleted successfully.');
};
