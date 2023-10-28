import { useMutation } from '@tanstack/react-query';
import { deleteLike } from '../../api/like';
import { DocumentReference } from 'firebase/firestore';

interface Params {
  commentRef: DocumentReference;
}

const useDeleteLikeMutation = ({ commentRef }: Params) => {
  return useMutation(() => {
    return deleteLike({ commentRef });
  });
};

export default useDeleteLikeMutation;
