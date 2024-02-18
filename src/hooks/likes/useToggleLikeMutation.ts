import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { DocumentReference } from 'firebase/firestore';

import { toggleLike } from '../../services/likes';
import { PreviousData } from '../comment/useCommentsInfiniteQuery';

interface Params {
  commentRef: DocumentReference;
}

const useToggleLikeMutation = ({
  commentRef,
  onMutate,
  onSuccess,
  onError,
  onSettled,
}: Params &
  UseMutationOptions<void, Error, boolean, { previousData: PreviousData }>) => {
  return useMutation({
    mutationFn: (isLiked) => {
      return toggleLike({ commentRef, isLiked });
    },
    onMutate,
    onSuccess,
    onError,
    onSettled,
  });
};

export default useToggleLikeMutation;
