import { useQuery } from '@tanstack/react-query';
import { getMyComments } from '../../services/comment';

const useMyCommentsQuery = () => {
  return useQuery(
    ['myComments'],
    () => {
      return getMyComments();
    },
    {
      staleTime: 1000 * 60 * 1,
    }
  );
};

export default useMyCommentsQuery;
