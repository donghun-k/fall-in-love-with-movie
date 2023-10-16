import { useMutation } from '@tanstack/react-query';
import { deleteComment } from '../../api/comment';
import { DocumentReference } from 'firebase/firestore';

interface Params {
  commentRef: DocumentReference;
}

const useDeleteCommentMutation = ({ commentRef }: Params) => {
  return useMutation(() => {
    return deleteComment({ commentRef });
  });
};

export default useDeleteCommentMutation;
