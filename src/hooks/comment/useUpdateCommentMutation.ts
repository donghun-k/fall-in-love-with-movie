import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { DocumentReference } from 'firebase/firestore';

import { updateComment } from '../../services/comment';

interface Params {
  commentRef: DocumentReference;
}

const useUpdateCommentMutation = ({
  commentRef,
  onSuccess,
  onError,
  onSettled,
}: Params & UseMutationOptions<void, Error, string, void>) => {
  return useMutation({
    mutationFn: (content: string) => {
      return updateComment({ commentRef, content });
    },
    onSuccess,
    onError,
    onSettled,
  });
};

export default useUpdateCommentMutation;
