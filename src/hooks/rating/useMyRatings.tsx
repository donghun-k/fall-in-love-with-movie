import { useQuery } from '@tanstack/react-query';
import { getMyRatings } from '../../api/rating';

interface Params {
  userId: string;
}

const useMyRatings = ({ userId }: Params) => {
  return useQuery(
    ['myRatings', userId],
    () => {
      return getMyRatings({ userId });
    },
    {
      staleTime: 1000 * 60 * 1,
    }
  );
};

export default useMyRatings;
