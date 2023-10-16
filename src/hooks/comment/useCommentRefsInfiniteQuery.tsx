import { useQuery } from '@tanstack/react-query';
import { SortOptionType, getCommentRefs } from '../../api/comment';

interface Params {
  movieId: number;
  sortOption: SortOptionType;
}

const useCommentsInfiniteQuery = ({ movieId, sortOption }: Params) => {
  return useQuery(['comments', movieId, sortOption], () => {
    return getCommentRefs({ movieId, sortOption });
  });
};

export default useCommentsInfiniteQuery;
