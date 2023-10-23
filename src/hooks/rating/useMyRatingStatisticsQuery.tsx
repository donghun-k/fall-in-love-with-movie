import { useQuery } from '@tanstack/react-query';
import { getMyRatingsStatistics } from '../../api/rating';

interface Params {
  userId: string;
}

const useMyRatingStatisticsQuery = ({ userId }: Params) => {
  return useQuery(
    ['myRatingStatistics', userId],
    () => {
      return getMyRatingsStatistics({ userId });
    },
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};

export default useMyRatingStatisticsQuery;
