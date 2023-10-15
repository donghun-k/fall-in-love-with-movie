import { useQuery } from '@tanstack/react-query';
import { getComment } from '../../api/comment';

interface Params {
  movieId: number;
  authorId: string;
}

const useCommentQuery = ({ movieId, authorId }: Params) => {
  return useQuery(
    ['comment', movieId, authorId],
    () => {
      return getComment({ movieId, authorId });
    },
    {
      enabled: !!movieId && !!authorId,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};

export default useCommentQuery;
