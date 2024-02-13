import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { DocumentReference } from 'firebase/firestore';

import { toggleLike } from '../../services/likes';

interface Params {
  commentRef: DocumentReference;
}

const useToggleLikeMutation = ({
  commentRef,
  onMutate,
  onSuccess,
  onError,
  onSettled,
}: Params & UseMutationOptions<void, Error, void, void>) => {
  return useMutation({
    mutationFn: () => {
      return toggleLike({ commentRef });
    },
    onMutate,
    onSuccess,
    onError,
    onSettled,
  });
};

export default useToggleLikeMutation;
