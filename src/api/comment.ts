import {
  DocumentReference,
  QueryOrderByConstraint,
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';
import Comment from '../types/Comment';
import app from '../configs/firebase';

const db = getFirestore(app);
const commentsRef = collection(db, 'comments');

interface postCommentParams {
  movieId: number;
  authorId: string;
  username: string;
  userProfileImage: string;
  content: string;
  rating: number;
}

export const postComment = async ({
  movieId,
  authorId,
  username,
  userProfileImage,
  content,
  rating,
}: postCommentParams) => {
  const comment = {
    movieId,
    authorId,
    username,
    userProfileImage,
    content,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isUpdated: false,
    rating,
    likes: [],
    likeCount: 0,
  };
  const commentQuery = query(
    commentsRef,
    where('movieId', '==', movieId),
    where('authorId', '==', authorId)
  );
  const commentSnapshot = await getDocs(commentQuery);
  if (!commentSnapshot.empty) {
    throw new Error('코멘트가 이미 존재합니다.');
  }
  const docRef = await addDoc(commentsRef, comment);
  console.log('Comment written with ID: ', docRef.id);
};

// GET MY COMMENT
interface getMyCommentParams {
  movieId: number;
  authorId: string;
}

export const getMyComment = async ({
  movieId,
  authorId,
}: getMyCommentParams) => {
  const commentQuery = query(
    commentsRef,
    where('movieId', '==', movieId),
    where('authorId', '==', authorId)
  );
  const commentSnapshot = await getDocs(commentQuery);
  if (commentSnapshot.empty) {
    console.log('내가 작성한 코멘트가 없습니다.');
    return null;
  }
  const commentDoc = commentSnapshot.docs[0];
  return {
    ...commentDoc.data(),
    commentRef: commentDoc.ref,
  } as Comment;
};

// GET COMMENT
interface getCommentParams {
  commentRef: DocumentReference;
}

export const getComment = async ({ commentRef }: getCommentParams) => {
  const commentSnapshot = await getDoc(commentRef);
  if (!commentSnapshot.exists()) {
    throw new Error('코멘트를 찾지 못했습니다.');
  }
  return commentSnapshot.data() as Comment;
};

// DELETE COMMENT
interface deleteCommentParams {
  commentRef: DocumentReference;
}

export const deleteComment = async ({ commentRef }: deleteCommentParams) => {
  await deleteDoc(commentRef);
  console.log('코멘트가 정상적으로 삭제되었습니다.');
};

// UPDATE COMMENT
interface updateCommentParams {
  commentRef: DocumentReference;
  username: string;
  userProfileImage: string;
  content: string;
}

export const updateComment = async ({
  commentRef,
  username,
  userProfileImage,
  content,
}: updateCommentParams) => {
  await updateDoc(commentRef, {
    username,
    userProfileImage,
    content,
    updatedAt: Date.now(),
    isUpdated: true,
  });
  console.log('코멘트가 ㅈ정상적으로 수정되었습니다.');
};

// GET COMMENT REFS
export type SortOptionType =
  | 'latest'
  | 'registered'
  | 'likeCount'
  | 'highRated'
  | 'lowRated';
interface getCommentsParams {
  movieId: number;
  sortOption?: SortOptionType;
  lastDocRef?: DocumentReference;
}

export const getComments = async ({
  movieId,
  sortOption = 'latest',
  lastDocRef,
}: getCommentsParams) => {
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
    commentsQuery = query(
      commentsRef,
      where('movieId', '==', movieId),
      sortBy,
      limit(5)
    );
  } else {
    const lastDoc = await getDoc(lastDocRef);
    commentsQuery = query(
      commentsRef,
      where('movieId', '==', movieId),
      sortBy,
      startAfter(lastDoc),
      limit(5)
    );
  }

  const commentsSnapshot = await getDocs(commentsQuery);
  const result = commentsSnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      commentRef: doc.ref,
    } as Comment;
  });
  return result;
};
