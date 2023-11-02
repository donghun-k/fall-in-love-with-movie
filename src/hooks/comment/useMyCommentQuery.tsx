import { useQuery } from '@tanstack/react-query';
import { getMyComment } from '../../api/comment';
import useAuthContext from '../useAuthContext';

interface Params {
  movieId: number;
}

const useMyCommentQuery = ({ movieId }: Params) => {
  const { user } = useAuthContext();
  return useQuery(
    ['myComment', movieId, user?.uid],
    () => {
      return getMyComment({ movieId });
    },
    {
      enabled: !!movieId && !!user,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};

export default useMyCommentQuery;
