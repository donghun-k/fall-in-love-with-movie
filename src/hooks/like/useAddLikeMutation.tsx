import { useMutation } from '@tanstack/react-query';
import { addLike } from '../../api/like';

interface Params {
  commentAuthorId: string;
  movieId: number;
  userId: string;
}

const useAddLikeMutation = ({ commentAuthorId, movieId, userId }: Params) => {
  return useMutation(() => {
    return addLike({ commentAuthorId, movieId, userId });
  });
};

export default useAddLikeMutation;
