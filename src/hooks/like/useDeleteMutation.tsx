import { useMutation } from '@tanstack/react-query';
import { deleteLike } from '../../api/like';

interface Params {
  commentAuthorId: string;
  movieId: number;
  userId: string;
}

const useDeleteLikeMutation = ({
  commentAuthorId,
  movieId,
  userId,
}: Params) => {
  return useMutation(() => {
    return deleteLike({ commentAuthorId, movieId, userId });
  });
};

export default useDeleteLikeMutation;
