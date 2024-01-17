import { useQuery } from '@tanstack/react-query';
import { getMyComment } from '../../api/comment';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

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
