import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { DocumentReference } from 'firebase/firestore';
import { User } from 'firebase/auth';

import {
  GetCommentsResponse,
  SortOptionType,
  getComments,
} from '../../services/comment';

interface Params {
  movieId: number;
  sortOption: SortOptionType;
}

const useCommentsInfiniteQuery = ({ movieId, sortOption }: Params) => {
  const queryClient = useQueryClient();
  const queryResult = useInfiniteQuery(
    ['comments', movieId, sortOption],
    ({ pageParam }) => {
      return getComments({ movieId, sortOption, lastDocRef: pageParam });
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.hasMore
          ? lastPage.comments[lastPage.comments.length - 1].commentRef
          : undefined;
      },
      staleTime: 1000 * 60 * 1,
    }
  );

  const updateLikesOptimistically = async (
    commentRef: DocumentReference,
    type: 'add' | 'cancel',
    user: User
  ) => {
    await queryClient.cancelQueries(['comments', movieId, sortOption]);
    const previousData = queryClient.getQueryData<
      InfiniteData<GetCommentsResponse>
    >(['comments', movieId, sortOption]);

    queryClient.setQueryData<InfiniteData<GetCommentsResponse>>(
      ['comments', movieId, sortOption],
      (old) => {
        if (!old) return;
        const updatedData = old.pages.map((page) => {
          const { comments, hasMore } = page;
          const updatedComments = comments.map((comment) => {
            if (comment.commentRef.id !== commentRef.id) return comment;
            if (type === 'add') {
              return {
                ...comment,
                likes: [...comment.likes, user?.uid ?? ''],
                likeCount: comment.likeCount + 1,
              };
            } else {
              return {
                ...comment,
                likes: comment.likes.filter((uid) => uid !== user?.uid),
                likeCount: comment.likeCount - 1,
              };
            }
          });
          return { comments: updatedComments, hasMore };
        });
        return {
          ...old,
          pages: updatedData,
        };
      }
    );

    const rollback = () => {
      queryClient.setQueryData(['comments', movieId, sortOption], previousData);
    };

    return rollback;
  };

  return { ...queryResult, updateLikesOptimistically };
};

export default useCommentsInfiniteQuery;
