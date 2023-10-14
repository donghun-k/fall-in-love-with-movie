import { useMutation } from '@tanstack/react-query';
import { postRating } from '../../api/rating';

interface Params {
  movieId: number;
  userId: string;
}

const usePostRatingMutation = ({ movieId, userId }: Params) => {
  return useMutation((rating: number) => {
    return postRating({ movieId, userId, rating });
  });
};

export default usePostRatingMutation;
