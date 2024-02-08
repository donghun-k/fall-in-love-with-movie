import {
  DocumentReference,
  arrayRemove,
  arrayUnion,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

import { getCurrentUser } from './auth';

// POST LIKES
interface AddLikesParams {
  commentRef: DocumentReference;
}

export const addLikes = async ({ commentRef }: AddLikesParams) => {
  const user = getCurrentUser();
  if (!user) {
    throw new Error('로그인 상태가 아닙니다.');
  }
  const { uid: userId } = user;
  const commentDoc = await getDoc(commentRef);

  if (!commentDoc.exists()) {
    throw new Error('코멘트가 존재하지 않습니다.');
  }

  await updateDoc(commentDoc.ref, {
    likes: arrayUnion(userId),
    likesCount: commentDoc.data().likes.length + 1,
  });
};

// DELETE LIKES
interface cancelLikesParams {
  commentRef: DocumentReference;
}

export const cancelLikes = async ({ commentRef }: cancelLikesParams) => {
  const user = getCurrentUser();
  if (!user) {
    throw new Error('로그인 상태가 아닙니다.');
  }
  const { uid: userId } = user;
  const commentDoc = await getDoc(commentRef);

  if (!commentDoc.exists()) {
    throw new Error('코멘트가 존재하지 않습니다.');
  }

  await updateDoc(commentDoc.ref, {
    likes: arrayRemove(userId),
    likesCount: commentDoc.data().likes.length - 1,
  });
};
