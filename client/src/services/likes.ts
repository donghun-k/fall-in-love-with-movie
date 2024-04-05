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
  isLiked: boolean;
}

export const toggleLike = async ({
  commentRef,
  isLiked,
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
  const actualIsLiked = likesArray.includes(userId);

  if (isLiked !== actualIsLiked) {
    throw new Error(
      isLiked
        ? `이미 '좋아요'를 등록했습니다.`
        : `아직 '좋아요'를 등록하지 않았습니다.`,
    );
  }

  await updateDoc(commentDoc.ref, {
    likes: isLiked ? arrayRemove(userId) : arrayUnion(userId),
    likeCount: isLiked ? likeCount - 1 : likeCount + 1,
  });
};
