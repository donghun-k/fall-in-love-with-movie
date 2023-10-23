import { useMutation } from '@tanstack/react-query';
import { postRating } from '../../api/rating';

interface Params {
  movieId: number;
  movieTitle: string;
  movieGenreIds: number[];
  userId: string;
}

const usePostRatingMutation = ({
  movieId,
  movieTitle,
  movieGenreIds,
  userId,
}: Params) => {
  return useMutation((rating: number) => {
    return postRating({ movieId, movieTitle, movieGenreIds, userId, rating });
  });
};

export default usePostRatingMutation;
