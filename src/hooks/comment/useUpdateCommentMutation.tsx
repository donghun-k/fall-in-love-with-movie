import { useMutation } from '@tanstack/react-query';
import { updateComment } from '../../api/comment';

interface Params {
  movieId: number;
  authorId: string;
  username: string;
  userProfileImage: string;
}

const useUpdateCommentMutation = ({
  movieId,
  authorId,
  username,
  userProfileImage,
}: Params) => {
  return useMutation((content: string) => {
    return updateComment({
      movieId,
      authorId,
      username,
      userProfileImage,
      content,
    });
  });
};

export default useUpdateCommentMutation;
