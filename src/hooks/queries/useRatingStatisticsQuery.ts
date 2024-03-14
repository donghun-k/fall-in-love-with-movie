import { useQuery } from '@tanstack/react-query';

import { getRatingsStatistics } from '../../services/rating';

interface Params {
  movieId: number;
}

const useRatingStatisticsQuery = ({ movieId }: Params) => {
  return useQuery({
    queryKey: ['ratingStatistics', movieId],

    queryFn: () => {
      return getRatingsStatistics({ movieId });
    },

    staleTime: 1000 * 60 * 60 * 24,
  });
};

export default useRatingStatisticsQuery;
