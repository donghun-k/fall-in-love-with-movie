import { useQuery } from '@tanstack/react-query';

import { getMyComments } from '../../services/comment';

const useMyCommentsQuery = () => {
  return useQuery({
    queryKey: ['myComments'],

    queryFn: () => {
      return getMyComments();
    },

    staleTime: 1000 * 60 * 1
  });
};

export default useMyCommentsQuery;
