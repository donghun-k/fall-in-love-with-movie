import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { getMyComment } from '../../services/comment';
import { RootState } from '../../store';
interface Params {
  movieId: number;
}

const useMyCommentQuery = ({ movieId }: Params) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return useQuery({
    queryKey: ['myComment', movieId, user?.uid],

    queryFn: () => {
      return getMyComment({ movieId });
    },

    enabled: !!movieId && !!user,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export default useMyCommentQuery;
