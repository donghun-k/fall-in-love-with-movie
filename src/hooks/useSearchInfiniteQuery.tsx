import { useInfiniteQuery } from '@tanstack/react-query';
import { searchMovie } from '../api/movies';

interface Params {
  query: string;
}

const useSearchInfiniteQuery = ({ query }: Params) => {
  return useInfiniteQuery(
    ['search', query],
    ({ pageParam = 1 }) => {
      return searchMovie({
        query,
        page: Number(pageParam),
      });
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 1,
    }
  );
};

export default useSearchInfiniteQuery;
