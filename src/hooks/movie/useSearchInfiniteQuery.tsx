import { useInfiniteQuery } from '@tanstack/react-query';
import { searchMovie } from '../../api/movie';

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
      getNextPageParam: (lastPage) => {
        return lastPage.page + 1 <= lastPage.total_pages
          ? lastPage.page + 1
          : false;
      },
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};

export default useSearchInfiniteQuery;
