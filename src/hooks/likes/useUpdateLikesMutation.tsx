import { useMutation } from '@tanstack/react-query';
import { DocumentReference } from 'firebase/firestore';

import { addLikes, cancelLikes } from '../../services/likes';

interface Params {
  commentRef: DocumentReference;
}

const useUpdateLikesMutation = ({ commentRef }: Params) => {
  return useMutation({
    mutationFn: (type: 'add' | 'cancel') => {
      const mutate = type === 'add' ? addLikes : cancelLikes;

      return mutate({ commentRef });
    },
  });
};

export default useUpdateLikesMutation;
