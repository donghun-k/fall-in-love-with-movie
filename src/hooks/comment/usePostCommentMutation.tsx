import { useMutation } from '@tanstack/react-query';

import { postComment } from '../../services/comment';

interface Params {
  movieId: number;
  movieTitle: string;
}

const usePostCommentMutation = ({ movieId, movieTitle }: Params) => {
  return useMutation({
    mutationFn: ({ content, rating }: { content: string; rating: number }) => {
      return postComment({
        movieId,
        movieTitle,
        content,
        rating,
      });
    },
  });
};

export default usePostCommentMutation;
