import { useQuery } from '@tanstack/react-query';
import { getMyComments } from '../../api/comment';

interface Params {
  userId: string;
}

const useMyCommentsQuery = ({ userId }: Params) => {
  return useQuery(
    ['myComments', userId],
    () => {
      return getMyComments({
        authorId: userId,
      });
    },
    {
      enabled: !!userId,
      staleTime: 1000 * 60 * 1,
    }
  );
};

export default useMyCommentsQuery;
