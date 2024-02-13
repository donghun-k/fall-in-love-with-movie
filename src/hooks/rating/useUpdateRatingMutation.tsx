import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { updateRating } from '../../services/rating';

interface Params {
  movieId: number;
  movieTitle: string;
  movieGenreIds: number[];
}

const useUpdateRatingMutation = ({
  movieId,
  movieTitle,
  movieGenreIds,
  onSuccess,
  onError,
  onSettled,
}: Params & UseMutationOptions<void, Error, number, void>) => {
  return useMutation({
    mutationFn: async (rating: number) => {
      return updateRating({ movieId, movieTitle, movieGenreIds, rating });
    },
    onSuccess,
    onError,
    onSettled,
  });
};

export default useUpdateRatingMutation;
