import {
  DocumentReference,
  QueryOrderByConstraint,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import Comment from '../models/Comment';
import app from './firebase';
import MyComment from '../models/MyComment';
import { getCurrentUser } from './auth';

const db = getFirestore(app);
const commentsRef = collection(db, 'comments');

interface PostCommentParams {
  movieId: number;
  movieTitle: string;
  content: string;
  rating: number;
}

export const postComment = async ({
  movieId,
  movieTitle,
  content,
  rating,
}: PostCommentParams) => {
  const user = getCurrentUser();
  if (!user || !user.displayName || !user.photoURL) {
    throw new Error('로그인 상태가 아닙니다.');
  }
  const {
    uid: userId,
    displayName: username,
    photoURL: userProfileImage,
  } = user;

  const commentQuery = query(
    commentsRef,
    where('movieId', '==', movieId),
    where('authorId', '==', userId)
  );
  const commentSnapshot = await getDocs(commentQuery);
  if (!commentSnapshot.empty) {
    throw new Error('코멘트가 이미 존재합니다.');
  }
  const refId = uuid();
  const newDocRef = doc(db, 'comments', refId);

  const comment: Comment = {
    movieId,
    movieTitle,
    authorId: userId,
    username,
    userProfileImage,
    content,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isUpdated: false,
    rating: rating === 0 ? null : rating,
    likes: [],
    likeCount: 0,
    commentRef: newDocRef,
  };

  await setDoc(newDocRef, comment);
};

// GET MY COMMENT
interface GetMyCommentParams {
  movieId: number;
}

export const getMyComment = async ({ movieId }: GetMyCommentParams) => {
  const user = getCurrentUser();
  if (!user) {
    return null;
  }
  const { uid: userId } = user;
  const commentQuery = query(
    commentsRef,
    where('movieId', '==', movieId),
    where('authorId', '==', userId)
  );
  const commentSnapshot = await getDocs(commentQuery);
  if (commentSnapshot.empty) {
    return null;
  }
  const commentDoc = commentSnapshot.docs[0];
  return {
    ...commentDoc.data(),
    commentRef: commentDoc.ref,
  } as MyComment;
};

// GET COMMENT
interface GetCommentParams {
  commentRef: DocumentReference;
}

export const getComment = async ({ commentRef }: GetCommentParams) => {
  const commentSnapshot = await getDoc(commentRef);
  if (!commentSnapshot.exists()) {
    throw new Error('코멘트를 찾지 못했습니다.');
  }
  return commentSnapshot.data() as Comment;
};

// DELETE COMMENT
interface DeleteCommentParams {
  commentRef: DocumentReference;
}

export const deleteComment = async ({ commentRef }: DeleteCommentParams) => {
  await deleteDoc(commentRef);
};

// UPDATE COMMENT
interface UpdateCommentParams {
  commentRef: DocumentReference;
  content: string;
}

export const updateComment = async ({
  commentRef,
  content,
}: UpdateCommentParams) => {
  const user = getCurrentUser();
  if (!user) {
    throw new Error('로그인 상태가 아닙니다.');
  }
  const { displayName: username, photoURL: userProfileImage } = user;
  await updateDoc(commentRef, {
    username,
    userProfileImage,
    content,
    updatedAt: Date.now(),
    isUpdated: true,
  });
};

// GET COMMENTS
export type SortOptionType =
  | 'latest'
  | 'registered'
  | 'likeCount'
  | 'highRated'
  | 'lowRated';
interface GetCommentsParams {
  movieId: number;
  sortOption?: SortOptionType;
  lastDocRef?: DocumentReference;
}

export interface GetCommentsResponse {
  comments: Comment[];
  hasMore: boolean;
}

export const getComments = async ({
  movieId,
  sortOption = 'latest',
  lastDocRef,
}: GetCommentsParams): Promise<GetCommentsResponse> => {
  let sortBy: QueryOrderByConstraint;
  if (sortOption === 'latest') {
    sortBy = orderBy('createdAt', 'desc');
  } else if (sortOption === 'registered') {
    sortBy = orderBy('createdAt', 'asc');
  } else if (sortOption === 'likeCount') {
    sortBy = orderBy('likeCount', 'desc');
  } else if (sortOption === 'highRated') {
    sortBy = orderBy('rating', 'desc');
  } else if (sortOption === 'lowRated') {
    sortBy = orderBy('rating', 'asc');
  } else {
    throw new Error('올바르지 않은 정렬 기준입니다.');
  }

  let commentsQuery;

  if (!lastDocRef) {
    commentsQuery =
      sortOption === 'highRated' || sortOption === 'lowRated'
        ? query(
            commentsRef,
            where('movieId', '==', movieId),
            sortBy,
            where('rating', '!=', null),
            limit(6)
          )
        : query(commentsRef, where('movieId', '==', movieId), sortBy, limit(6));
  } else {
    const lastDoc = await getDoc(lastDocRef);
    commentsQuery = query(
      commentsRef,
      where('movieId', '==', movieId),
      sortBy,
      startAfter(lastDoc),
      limit(6)
    );
  }

  const commentsSnapshot = await getDocs(commentsQuery);
  const comments = commentsSnapshot.docs.slice(0, 5).map((doc) => {
    return {
      ...doc.data(),
      commentRef: doc.ref,
    } as Comment;
  });

  const hasMore = commentsSnapshot.docs.length === 6;

  return {
    comments,
    hasMore,
  };
};

// GET MY COMMENTS
export const getMyComments = async (): Promise<Comment[]> => {
  const user = getCurrentUser();
  if (!user) {
    return [];
  }
  const { uid: userId } = user;
  const commentsQuery = query(commentsRef, where('authorId', '==', userId));
  const commentsSnapshot = await getDocs(commentsQuery);
  const result = commentsSnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      commentRef: doc.ref,
    } as Comment;
  });
  return result;
};
