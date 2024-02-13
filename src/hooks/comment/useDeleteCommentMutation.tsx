import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { DocumentReference } from 'firebase/firestore';

import { deleteComment } from '../../services/comment';

interface Params {
  commentRef: DocumentReference;
}

const useDeleteCommentMutation = ({
  commentRef,
  onSuccess,
  onError,
  onSettled,
}: Params & UseMutationOptions<void, Error, void, void>) => {
  return useMutation({
    mutationFn: () => {
      return deleteComment({ commentRef });
    },
    onSuccess,
    onError,
    onSettled,
  });
};

export default useDeleteCommentMutation;
