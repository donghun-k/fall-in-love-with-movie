import { useMutation } from '@tanstack/react-query';
import { postComment } from '../../api/comment';

interface Params {
  movieId: number;
  userId: string;
  username: string;
  userProfileImage: string;
}

const usePostCommentMutation = ({
  movieId,
  userId,
  username,
  userProfileImage,
}: Params) => {
  return useMutation((content: string) => {
    return postComment({
      movieId,
      userId,
      username,
      userProfileImage,
      content,
    });
  });
};

export default usePostCommentMutation;
