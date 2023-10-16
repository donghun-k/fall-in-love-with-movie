import { useQuery } from '@tanstack/react-query';
import { getMyComment } from '../../api/comment';

interface Params {
  movieId: number;
  authorId: string;
}

const useMyCommentQuery = ({ movieId, authorId }: Params) => {
  return useQuery(
    ['myComment', movieId, authorId],
    () => {
      return getMyComment({ movieId, authorId });
    },
    {
      enabled: !!movieId && !!authorId,
      refetchOnMount: 'always',
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};

export default useMyCommentQuery;
