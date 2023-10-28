import { useQuery } from '@tanstack/react-query';
import { getMyRating } from '../../api/rating';

interface Params {
  movieId: number;
}

const useMyRatingQuery = ({ movieId }: Params) => {
  return useQuery(
    ['myRating', movieId],
    () => {
      return getMyRating({ movieId });
    },
    {
      enabled: !!movieId,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};

export default useMyRatingQuery;
