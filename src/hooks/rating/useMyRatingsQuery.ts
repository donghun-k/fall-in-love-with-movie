import { useQuery } from '@tanstack/react-query';

import { getMyRatings } from '../../services/rating';

const useMyRatingsQuery = () => {
  return useQuery({
    queryKey: ['myRatings'],

    queryFn: () => {
      return getMyRatings();
    },

    staleTime: 1000 * 60 * 1,
  });
};

export default useMyRatingsQuery;
