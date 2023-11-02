import { useInfiniteQuery } from '@tanstack/react-query';
import { SortOptionType, getComments } from '../../api/comment';

interface Params {
  movieId: number;
  sortOption: SortOptionType;
}

const useCommentsInfiniteQuery = ({ movieId, sortOption }: Params) => {
  return useInfiniteQuery(
    ['comments', movieId, sortOption],
    ({ pageParam }) => {
      return getComments({ movieId, sortOption, lastDocRef: pageParam });
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.length < 5
          ? false
          : lastPage[lastPage.length - 1].commentRef;
      },
      staleTime: 1000 * 60 * 1,
    }
  );
};

export default useCommentsInfiniteQuery;
