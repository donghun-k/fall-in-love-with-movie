import { useQuery } from '@tanstack/react-query';
import { SortOptionType, getComments } from '../../api/comment';

interface Params {
  movieId: number;
  sortOption: SortOptionType;
}

const useCommentsInfiniteQuery = ({ movieId, sortOption }: Params) => {
  return useQuery(['comments', movieId, sortOption], () => {
    return getComments({ movieId, sortOption });
  });
};

export default useCommentsInfiniteQuery;
