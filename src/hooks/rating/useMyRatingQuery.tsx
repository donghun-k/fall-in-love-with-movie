import { useQuery } from '@tanstack/react-query';
import { getMyRating } from '../../api/rating';

interface Params {
  movieId: number;
  userId: string;
}

const useMyRatingQuery = ({ movieId, userId }: Params) => {
  return useQuery(
    ['myRating', movieId, userId],
    () => {
      return getMyRating({ movieId, userId });
    },
    {
      enabled: !!movieId && !!userId,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};

export default useMyRatingQuery;
