import { useMutation } from '@tanstack/react-query';
import { postComment } from '../../api/comment';

interface Params {
  movieId: number;
  authorId: string;
  username: string;
  userProfileImage: string;
}

const usePostCommentMutation = ({
  movieId,
  authorId,
  username,
  userProfileImage,
}: Params) => {
  return useMutation(
    ({ content, rating }: { content: string; rating: number }) => {
      return postComment({
        movieId,
        authorId,
        username,
        userProfileImage,
        content,
        rating,
      });
    }
  );
};

export default usePostCommentMutation;
