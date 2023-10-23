import app from '../configs/firebase';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  runTransaction,
  where,
} from 'firebase/firestore';

const db = getFirestore(app);
const ratingsRef = collection(db, 'ratings');
const commentsRef = collection(db, 'comments');

// POST MY RATING
interface postRatingParams {
  userId: string;
  movieId: number;
  rating: number;
}

export const postRating = async ({
  userId,
  movieId,
  rating,
}: postRatingParams) => {
  if (!userId || !movieId) {
    throw new Error('Invalid params');
  }

  const ratingQuery = query(
    ratingsRef,
    where('userId', '==', userId),
    where('movieId', '==', movieId)
  );

  const commetQuery = query(
    commentsRef,
    where('authorId', '==', userId),
    where('movieId', '==', movieId)
  );

  const [ratingSnapshot, commentSnapshot] = await Promise.all([
    getDocs(ratingQuery),
    getDocs(commetQuery),
  ]);

  const ratingDocs = ratingSnapshot.docs;
  const commentDocs = commentSnapshot.docs;

  await runTransaction(db, async (transaction) => {
    if (ratingSnapshot.empty) {
      await addDoc(ratingsRef, {
        userId,
        movieId,
        rating,
      });
      console.log('별점이 정상적으로 등록되었습니다.');
    } else {
      const ratingDocRef = ratingDocs[0].ref;
      if (rating === 0) {
        transaction.delete(ratingDocRef);
        console.log('별점이 정상적으로 삭제되었습니다.');
      } else {
        transaction.update(ratingDocRef, {
          rating,
        });
        console.log('별점이 정상적으로 수정되었습니다.');
      }
    }
    if (!commentSnapshot.empty) {
      const commentDocRef = commentDocs[0].ref;
      transaction.update(commentDocRef, {
        rating,
      });
      console.log('코멘트의 별점이 정상적으로 수정되었습니다.');
    }
  });
  console.log('별점 등록 과정이 정상적으로 완료되었습니다.');
};

// GET RATING
interface getRatingParams {
  userId: string;
  movieId: number;
}

export const getRating = async ({ userId, movieId }: getRatingParams) => {
  const ratingQuery = query(
    ratingsRef,
    where('userId', '==', userId),
    where('movieId', '==', movieId)
  );
  const ratingSnapshot = await getDocs(ratingQuery);

  if (ratingSnapshot.empty) {
    return 0;
  }

  return ratingSnapshot.docs[0]?.data()?.rating as number;
};

// GET RATINGS STATISICS
interface getRatingsStatisticsParams {
  movieId: number;
}

export interface RatingsStatisticsResponse {
  ratingData: number[];
  totalRatingCount: number;
  averageRating: number;
}

export const getRatingsStatistics = async ({
  movieId,
}: getRatingsStatisticsParams): Promise<RatingsStatisticsResponse> => {
  const ratingData = Array(10).fill(0);
  let totalRatingCount = 0;
  let sumRating = 0;

  const ratingQuery = query(ratingsRef, where('movieId', '==', movieId));
  const { docs: ratingDocs } = await getDocs(ratingQuery);
  ratingDocs.forEach((doc) => {
    const rating = doc.data().rating;
    if (rating < 1 || rating > 10) return;
    ratingData[rating - 1] += 1;
    totalRatingCount += 1;
    sumRating += rating;
  });

  const averageRating =
    totalRatingCount > 0
      ? Math.round((sumRating / totalRatingCount) * 10) / 10
      : 0;

  return {
    ratingData,
    totalRatingCount,
    averageRating,
  };
};

// GET MY RATINGS STATISICS
interface getMyRatingsStatisticsParams {
  userId: string;
}

export const getMyRatingsStatistics = async ({
  userId,
}: getMyRatingsStatisticsParams): Promise<RatingsStatisticsResponse> => {
  const ratingData = Array(10).fill(0);
  let totalRatingCount = 0;
  let sumRating = 0;

  const ratingQuery = query(ratingsRef, where('userId', '==', userId));
  const { docs: ratingDocs } = await getDocs(ratingQuery);
  ratingDocs.forEach((doc) => {
    const rating = doc.data().rating;
    if (rating < 1 || rating > 10) return;
    ratingData[rating - 1] += 1;
    totalRatingCount += 1;
    sumRating += rating;
  });

  const averageRating =
    totalRatingCount > 0
      ? Math.round((sumRating / totalRatingCount) * 10) / 10
      : 0;

  return {
    ratingData,
    totalRatingCount,
    averageRating,
  };
};
