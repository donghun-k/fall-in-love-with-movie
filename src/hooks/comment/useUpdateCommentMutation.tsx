import { useMutation } from '@tanstack/react-query';
import { updateComment } from '../../services/comment';
import { DocumentReference } from 'firebase/firestore';

interface Params {
  commentRef: DocumentReference;
}

const useUpdateCommentMutation = ({ commentRef }: Params) => {
  return useMutation(({ content }: { content: string }) => {
    return updateComment({
      commentRef,
      content,
    });
  });
};

export default useUpdateCommentMutation;
