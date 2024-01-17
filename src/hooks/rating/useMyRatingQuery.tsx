import { useQuery } from '@tanstack/react-query';
import { getMyRating } from '../../api/rating';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface Params {
  movieId: number;
}

const useMyRatingQuery = ({ movieId }: Params) => {
  const { user } = useSelector((state: RootState) => state.auth);
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
