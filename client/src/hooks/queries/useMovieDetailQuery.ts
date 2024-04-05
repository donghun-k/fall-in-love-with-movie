import { useQuery } from '@tanstack/react-query';

import { getMovieDetail } from '../../services/movie';

interface Params {
  movieId: number;
}

const useMovieDetailQuery = ({ movieId }: Params) => {
  return useQuery({
    queryKey: ['movieDetail', movieId],

    queryFn: () => {
      return getMovieDetail({ movieId });
    },

    enabled: !!movieId,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export default useMovieDetailQuery;
