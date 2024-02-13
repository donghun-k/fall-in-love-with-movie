import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { DocumentReference } from 'firebase/firestore';

import { addLikes, cancelLikes } from '../../services/likes';

interface Params {
  commentRef: DocumentReference;
}

const useUpdateLikesMutation = ({
  commentRef,
  onSuccess,
  onError,
  onSettled,
}: Params & UseMutationOptions<void, Error, 'add' | 'cancel', void>) => {
  return useMutation({
    mutationFn: (type: 'add' | 'cancel') => {
      const mutate = type === 'add' ? addLikes : cancelLikes;

      return mutate({ commentRef });
    },
    onSuccess,
    onError,
    onSettled,
  });
};

export default useUpdateLikesMutation;
