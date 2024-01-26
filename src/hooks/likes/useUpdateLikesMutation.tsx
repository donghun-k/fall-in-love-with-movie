import { useMutation } from '@tanstack/react-query';
import { DocumentReference } from 'firebase/firestore';

import { addLikes, cancelLikes } from '../../services/likes';

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
