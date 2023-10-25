import {
  DocumentReference,
  arrayRemove,
  arrayUnion,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

// POST LIKE
interface AddLikeParams {
  commentRef: DocumentReference;
  userId: string;
}

export const addLike = async ({ commentRef, userId }: AddLikeParams) => {
  const commentDoc = await getDoc(commentRef);

  if (!commentDoc.exists()) {
    throw new Error('코멘트가 존재하지 않습니다.');
  }

  await updateDoc(commentDoc.ref, {
    likes: arrayUnion(userId),
    likeCount: commentDoc.data().likes.length + 1,
  });
  console.log('정상적으로 공감이 등록되었습니다.');
};

// DELETE LIKE
interface DeleteLikeParams {
  commentRef: DocumentReference;
  userId: string;
}

export const deleteLike = async ({ commentRef, userId }: DeleteLikeParams) => {
  const commentDoc = await getDoc(commentRef);

  if (!commentDoc.exists()) {
    throw new Error('코멘트가 존재하지 않습니다.');
  }

  await updateDoc(commentDoc.ref, {
    likes: arrayRemove(userId),
    likeCount: commentDoc.data().likes.length - 1,
  });
  console.log('정상적으로 공감이 삭제되었습니다.');
};
