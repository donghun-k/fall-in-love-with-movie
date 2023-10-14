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
  return useMutation(
    ({ content, rating }: { content: string; rating: number }) => {
      return postComment({
        movieId,
        userId,
        username,
        userProfileImage,
        content,
        rating,
      });
    }
  );
};

export default usePostCommentMutation;
