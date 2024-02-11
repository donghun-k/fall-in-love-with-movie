import { useMutation } from '@tanstack/react-query';

import { updateRating } from '../../services/rating';

interface Params {
  movieId: number;
  movieTitle: string;
  movieGenreIds: number[];
}

const useUodateRatingMutation = ({
  movieId,
  movieTitle,
  movieGenreIds,
}: Params) => {
  return useMutation({
    mutationFn: async (rating: number) => {
      return updateRating({ movieId, movieTitle, movieGenreIds, rating });
    },
  });
};

export default useUodateRatingMutation;
