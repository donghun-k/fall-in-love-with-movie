import { useQuery } from '@tanstack/react-query';
import { getComments } from '../../api/comment';

interface Params {
  movieId: number;
  userId?: string;
}

const useCommentsQuery = ({ movieId, userId }: Params) => {
  return useQuery(['comments', movieId, userId], () => {
    return getComments({ movieId, userId });
  });
};

export default useCommentsQuery;
