import { useQuery } from '@tanstack/react-query';
import { getMyRatings } from '../../api/rating';

interface Params {
  userId: string;
}

const useMyRatings = ({ userId }: Params) => {
  return useQuery(
    ['myRatingStatistics', userId],
    () => {
      return getMyRatings({ userId });
    },
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};

export default useMyRatings;
