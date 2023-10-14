import { useQuery } from '@tanstack/react-query';
import { getRating } from '../../api/rating';

interface Params {
  movieId: number;
  userId: string;
}

const useRatingQuery = ({ movieId, userId }: Params) => {
  return useQuery(
    ['myRating', movieId, userId],
    () => {
      return getRating({ movieId, userId });
    },
    {
      enabled: !!movieId && !!userId,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};

export default useRatingQuery;
