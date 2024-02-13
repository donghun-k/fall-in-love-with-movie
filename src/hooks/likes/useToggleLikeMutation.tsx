import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { DocumentReference } from 'firebase/firestore';

import { toggleLike } from '../../services/likes';

interface Params {
  commentRef: DocumentReference;
  isLiked: boolean;
}

const useToggleLikeMutation = ({
  commentRef,
  isLiked,
  onMutate,
  onSuccess,
  onError,
  onSettled,
}: Params & UseMutationOptions<void, Error, void, void>) => {
  return useMutation({
    mutationFn: () => {
      return toggleLike({ commentRef, isLiked });
    },
    onMutate,
    onSuccess,
    onError,
    onSettled,
  });
};

export default useToggleLikeMutation;
