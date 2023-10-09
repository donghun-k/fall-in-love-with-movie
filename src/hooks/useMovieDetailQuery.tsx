import { useQuery } from '@tanstack/react-query';
import getMovieDetail from '../api/movie/getMovieDetail';

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
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};

export default useMovieDetailQuery;
