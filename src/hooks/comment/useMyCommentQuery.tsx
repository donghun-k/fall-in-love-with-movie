import { useQuery } from '@tanstack/react-query';
import { getMyComment } from '../../api/comment';

interface Params {
  movieId: number;
  userId: string;
}

const useMyCommentQuery = ({ movieId, userId }: Params) => {
  return useQuery(
    ['myComment', movieId, userId],
    () => {
      return getMyComment({ movieId, userId });
    },
    {
      enabled: !!movieId && !!userId,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};

export default useMyCommentQuery;
