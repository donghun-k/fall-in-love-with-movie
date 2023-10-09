import { useQuery } from '@tanstack/react-query';
import getSimilarMovies from '../api/movie/getSimilarMovies';

interface Params {
  movieId: number;
}

const useSimilarMoviesQuery = ({ movieId }: Params) => {
  return useQuery(
    ['similarMovies', movieId],
    () => {
      return getSimilarMovies({ movieId });
    },
    {
      enabled: !!movieId,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};

export default useSimilarMoviesQuery;
