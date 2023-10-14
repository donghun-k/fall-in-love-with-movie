import { useQuery } from '@tanstack/react-query';
import { getComment } from '../../api/comment';

interface Params {
  movieId: number;
  userId: string;
}

const useCommentQuery = ({ movieId, userId }: Params) => {
  return useQuery(
    ['comment', movieId, userId],
    () => {
      return getComment({ movieId, userId });
    },
    {
      enabled: !!movieId && !!userId,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};

export default useCommentQuery;
