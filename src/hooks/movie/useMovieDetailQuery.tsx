import { useQuery } from '@tanstack/react-query';

import { getMovieDetail } from '../../services/movie';

interface Params {
  movieId: number;
}

const useMovieDetailQuery = ({ movieId }: Params) => {
  return useQuery(
    ['movieDetail', movieId],
    () => {
      return getMovieDetail({ movieId });
    },
    {
      enabled: !!movieId,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};

export default useMovieDetailQuery;
