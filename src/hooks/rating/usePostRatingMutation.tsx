import { useMutation } from '@tanstack/react-query';

import { postRating } from '../../services/rating';

interface Params {
  movieId: number;
  movieTitle: string;
  movieGenreIds: number[];
}

const usePostRatingMutation = ({
  movieId,
  movieTitle,
  movieGenreIds,
}: Params) => {
  return useMutation((rating: number) => {
    return postRating({ movieId, movieTitle, movieGenreIds, rating });
  });
};

export default usePostRatingMutation;
