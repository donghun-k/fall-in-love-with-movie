import { useQuery } from '@tanstack/react-query';
import { getMyRating } from '../../api/rating';
import useAuthContext from '../useAuthContext';

interface Params {
  movieId: number;
}

const useMyRatingQuery = ({ movieId }: Params) => {
  const { user } = useAuthContext();
  return useQuery(
    ['myRating', movieId, user?.uid],
    () => {
      return getMyRating({ movieId });
    },
    {
      enabled: !!movieId && !!user,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};

export default useMyRatingQuery;
