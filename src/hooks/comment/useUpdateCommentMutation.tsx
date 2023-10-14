import { useMutation } from '@tanstack/react-query';
import { updateComment } from '../../api/comment';

interface Params {
  movieId: number;
  userId: string;
  username: string;
  userProfileImage: string;
}

const useUpdateCommentMutation = ({
  movieId,
  userId,
  username,
  userProfileImage,
}: Params) => {
  return useMutation((content: string) => {
    return updateComment({
      movieId,
      userId,
      username,
      userProfileImage,
      content,
    });
  });
};

export default useUpdateCommentMutation;
