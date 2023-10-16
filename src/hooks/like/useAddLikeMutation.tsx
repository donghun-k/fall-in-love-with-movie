import { useMutation } from '@tanstack/react-query';
import { addLike } from '../../api/like';
import { DocumentReference } from 'firebase/firestore';

interface Params {
  commentRef: DocumentReference;
  userId: string;
}

const useAddLikeMutation = ({ commentRef, userId }: Params) => {
  return useMutation(() => {
    return addLike({ commentRef, userId });
  });
};

export default useAddLikeMutation;
