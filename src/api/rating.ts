import app from '../configs/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

const db = getFirestore(app);
const ratingsRef = collection(db, 'ratings');

interface postMyRatingParams {
  userId: string;
  movieId: number;
  rating: number;
}

export const postMyRating = async ({
  userId,
  movieId,
  rating,
}: postMyRatingParams) => {
  if (!userId || !movieId) {
    throw new Error('Invalid params');
  }

  const q = query(
    ratingsRef,
    where('userId', '==', userId),
    where('movieId', '==', movieId)
  );
  const { docs } = await getDocs(q);

  if (docs.length > 0) {
    const docId = docs[0].id;
    const docRef = doc(db, 'ratings', docId);

    if (rating === 0) {
      await deleteDoc(docRef);
      console.log(docId + ' deleted');
      return;
    }
    await updateDoc(docRef, {
      rating,
    });
    console.log(docId + ' updated');
  } else {
    const docRef = await addDoc(ratingsRef, {
      userId,
      movieId,
      rating,
    });
    console.log('Document written with ID: ', docRef.id);
  }
};

interface getMyRatingParams {
  userId: string;
  movieId: number;
}

export const getMyRating = async ({ userId, movieId }: getMyRatingParams) => {
  const q = query(
    ratingsRef,
    where('userId', '==', userId),
    where('movieId', '==', movieId)
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return 0;
  }

  return snapshot.docs[0]?.data()?.rating as number;
};
