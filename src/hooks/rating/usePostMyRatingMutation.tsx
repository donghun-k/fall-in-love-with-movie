import { useMutation } from '@tanstack/react-query';
import { postMyRating } from '../../api/rating';

interface Params {
  movieId: number;
  userId: string;
}

const usePostMyRatingMutation = ({ movieId, userId }: Params) => {
  return useMutation((rating: number) => {
    return postMyRating({ movieId, userId, rating });
  });
};

export default usePostMyRatingMutation;
