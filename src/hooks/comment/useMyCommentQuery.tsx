import { useQuery } from '@tanstack/react-query';
import { getMyComment } from '../../api/comment';

interface Params {
  movieId: number;
}

const useMyCommentQuery = ({ movieId }: Params) => {
  return useQuery(
    ['myComment', movieId],
    () => {
      return getMyComment({ movieId });
    },
    {
      enabled: !!movieId,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};

export default useMyCommentQuery;
