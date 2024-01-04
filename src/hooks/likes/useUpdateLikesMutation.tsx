import { useMutation } from '@tanstack/react-query';
import { addLikes, cancelLikes } from '../../api/likes';
import { DocumentReference } from 'firebase/firestore';

interface Params {
  commentRef: DocumentReference;
}

const useUpdateLikesMutation = ({ commentRef }: Params) => {
  return useMutation((type: 'add' | 'cancel') => {
    const mutationFn = type === 'add' ? addLikes : cancelLikes;

    return mutationFn({ commentRef });
  });
};

export default useUpdateLikesMutation;
