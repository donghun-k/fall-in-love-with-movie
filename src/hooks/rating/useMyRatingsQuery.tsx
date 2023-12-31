import { useQuery } from '@tanstack/react-query';
import { getMyRatings } from '../../api/rating';

const useMyRatingsQuery = () => {
  return useQuery(
    ['myRatings'],
    () => {
      return getMyRatings();
    },
    {
      staleTime: 1000 * 60 * 1,
    }
  );
};

export default useMyRatingsQuery;
