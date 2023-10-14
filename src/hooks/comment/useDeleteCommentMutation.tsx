import { useMutation } from '@tanstack/react-query';
import { deleteComment } from '../../api/comment';

interface Params {
  movieId: number;
  userId: string;
}

const useDeleteCommentMutation = ({ movieId, userId }: Params) => {
  return useMutation(() => {
    return deleteComment({ movieId, userId });
  });
};

export default useDeleteCommentMutation;
