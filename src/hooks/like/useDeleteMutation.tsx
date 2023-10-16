import { useMutation } from '@tanstack/react-query';
import { deleteLike } from '../../api/like';
import { DocumentReference } from 'firebase/firestore';

interface Params {
  commentRef: DocumentReference;
  userId: string;
}

const useDeleteLikeMutation = ({ commentRef, userId }: Params) => {
  return useMutation(() => {
    return deleteLike({ commentRef, userId });
  });
};

export default useDeleteLikeMutation;
