import { useMutation } from '@tanstack/react-query';
import { addLike, cancelLike } from '../../api/like';
import { DocumentReference } from 'firebase/firestore';

interface Params {
  commentRef: DocumentReference;
}

const useUpdateLikeMutation = ({ commentRef }: Params) => {
  return useMutation((type: 'add' | 'cancel') => {
    const mutationFn = type === 'add' ? addLike : cancelLike;

    return mutationFn({ commentRef });
  });
};

export default useUpdateLikeMutation;
