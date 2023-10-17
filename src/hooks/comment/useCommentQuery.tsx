import { useQuery } from '@tanstack/react-query';
import { getComment } from '../../api/comment';
import { DocumentReference } from 'firebase/firestore';

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
