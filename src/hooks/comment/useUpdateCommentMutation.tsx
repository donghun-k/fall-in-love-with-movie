import { useMutation } from '@tanstack/react-query';
import { DocumentReference } from 'firebase/firestore';

import { updateComment } from '../../services/comment';

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
