import { useMutation } from '@tanstack/react-query';
import { updateComment } from '../../api/comment';
import { DocumentReference } from 'firebase/firestore';

interface Params {
  username: string;
  userProfileImage: string;
  commentRef: DocumentReference;
}

const useUpdateCommentMutation = ({
  username,
  userProfileImage,
  commentRef,
}: Params) => {
  return useMutation(({ content }: { content: string }) => {
    return updateComment({
      commentRef,
      username,
      userProfileImage,
      content,
    });
  });
};

export default useUpdateCommentMutation;
