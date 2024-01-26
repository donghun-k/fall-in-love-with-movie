import { useQuery } from '@tanstack/react-query';
import { getMyComment } from '../../services/comment';
import { useSelector } from 'react-redux';
import { RootState } from '../../app';

interface Params {
  movieId: number;
}

const useMyCommentQuery = ({ movieId }: Params) => {
  const { user } = useSelector((state: RootState) => state.auth);
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
