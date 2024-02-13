import {
  DocumentReference,
  arrayRemove,
  arrayUnion,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

import { getCurrentUser } from './auth';

interface ToggleLikeParams {
  commentRef: DocumentReference;
}

export const toggleLike = async ({
  commentRef,
}: ToggleLikeParams): Promise<void> => {
  const user = getCurrentUser();
  if (!user) {
    throw new Error('로그인 상태가 아닙니다.');
  }
  const { uid: userId } = user;
  const commentDoc = await getDoc(commentRef);

  if (!commentDoc.exists()) {
    throw new Error('코멘트가 존재하지 않습니다.');
  }

  const commentData = commentDoc.data();
  const likesArray: string[] = commentData.likes || [];
  const likeCount = likesArray.length;
  const isLiked = likesArray.includes(userId);

  await updateDoc(commentDoc.ref, {
    likes: isLiked ? arrayRemove(userId) : arrayUnion(userId),
    likeCount: isLiked ? likeCount - 1 : likeCount + 1,
  });
};
