import { useQuery } from '@tanstack/react-query';
import { DocumentReference } from 'firebase/firestore';

import { getComment } from '../../services/comment';

interface Params {
  commentRef: DocumentReference;
}

const useCommentQuery = ({ commentRef }: Params) => {
  return useQuery(
    ['comment', commentRef],
    () => {
      return getComment({ commentRef });
    },
    {
      enabled: !!commentRef,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 10,
    }
  );
};

export default useCommentQuery;
