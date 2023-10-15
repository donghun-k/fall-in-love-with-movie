import { useMutation } from '@tanstack/react-query';
import { deleteComment } from '../../api/comment';

interface Params {
  movieId: number;
  authorId: string;
}

const useDeleteCommentMutation = ({ movieId, authorId }: Params) => {
  return useMutation(() => {
    return deleteComment({ movieId, authorId });
  });
};

export default useDeleteCommentMutation;
