import { useMutation } from '@tanstack/react-query';
import { DocumentReference } from 'firebase/firestore';

import { deleteComment } from '../../services/comment';

interface Params {
  commentRef: DocumentReference;
}

const useDeleteCommentMutation = ({ commentRef }: Params) => {
  return useMutation({
    mutationFn: () => {
      return deleteComment({ commentRef });
    },
  });
};

export default useDeleteCommentMutation;
