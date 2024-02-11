import { useInfiniteQuery } from '@tanstack/react-query';

import { searchMovie } from '../../services/movie';

interface Params {
  query: string;
}

const useSearchInfiniteQuery = ({ query }: Params) => {
  return useInfiniteQuery({
    queryKey: ['search', query],

    queryFn: ({ pageParam }: { pageParam?: number }) => {
      return searchMovie({
        query,
        page: Number(pageParam),
      });
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      return lastPage.page + 1 <= lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },

    staleTime: 1000 * 60 * 60 * 24,
  });
};

export default useSearchInfiniteQuery;
