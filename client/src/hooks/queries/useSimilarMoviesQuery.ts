import { useQuery } from '@tanstack/react-query';

import { getSimilarMovies } from '../../services/movie';

interface Params {
  movieId: number;
}

const useSimilarMoviesQuery = ({ movieId }: Params) => {
  return useQuery({
    queryKey: ['similarMovies', movieId],

    queryFn: () => {
      return getSimilarMovies({ movieId });
    },

    enabled: !!movieId,
    staleTime: 1000 * 60 * 60 * 24
  });
};

export default useSimilarMoviesQuery;
