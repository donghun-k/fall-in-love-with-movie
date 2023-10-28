import { useMutation } from '@tanstack/react-query';
import { addLike } from '../../api/like';
import { DocumentReference } from 'firebase/firestore';

interface Params {
  commentRef: DocumentReference;
}

const useAddLikeMutation = ({ commentRef }: Params) => {
  return useMutation(() => {
    return addLike({ commentRef });
  });
};

export default useAddLikeMutation;
