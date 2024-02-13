import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { postComment } from '../../services/comment';

interface Params {
  movieId: number;
  movieTitle: string;
}

interface MutationFnParams {
  content: string;
  rating: number;
}

const usePostCommentMutation = ({
  movieId,
  movieTitle,
  onSuccess,
  onError,
  onSettled,
}: Params & UseMutationOptions<void, Error, MutationFnParams, void>) => {
  return useMutation({
    mutationFn: ({ content, rating }: MutationFnParams) => {
      return postComment({
        movieId,
        movieTitle,
        content,
        rating,
      });
    },
    onSuccess,
    onError,
    onSettled,
  });
};

export default usePostCommentMutation;
