import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { DocumentReference } from 'firebase/firestore';
import { User } from 'firebase/auth';

import { SortOptionType, getComments } from '../../services/comment';
import Comment from '../../models/Comment';

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
        return lastPage.length < 5
          ? false
          : lastPage[lastPage.length - 1].commentRef;
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
    const previousData = queryClient.getQueryData<InfiniteData<Comment[]>>([
      'comments',
      movieId,
      sortOption,
    ]);

    queryClient.setQueryData<InfiniteData<Comment[]>>(
      ['comments', movieId, sortOption],
      (old) => {
        if (!old) return;
        const newData = old.pages.map((page) => {
          return page.map((comment) => {
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
        });
        return {
          ...old,
          pages: newData,
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
