import { Box, Button } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { enqueueSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import { User } from 'firebase/auth';

import Comment from '../../../../../models/Comment';
import useToggleLikeMutation from '../../../../../hooks/mutations/useToggleLikeMutation';
import { UpdateLikesOptimisticallyFn } from '../../../../../hooks/queries/useCommentsInfiniteQuery';

interface Props {
  user: User | null;
  comment: Comment;
  updateLikesOptimistically: UpdateLikesOptimisticallyFn;
}

const OtherCommentActions = ({
  user,
  comment,
  updateLikesOptimistically,
}: Props) => {
  const userId = user?.uid ?? '';
  const { commentRef, likeCount, likes, authorId } = comment;
  const queryClient = useQueryClient();
  const isLiked = likes.includes(userId);
  const { mutate: toggleLike, isPending } = useToggleLikeMutation({
    commentRef,
    onMutate: async (isLiked) => {
      if (!user) return;
      const previousData = await updateLikesOptimistically({
        commentRef,
        isLiked,
        user,
      });
      return {
        previousData,
      };
    },
    onSuccess: (_, isLiked) => {
      if (isLiked)
        enqueueSnackbar(`'좋아요'가 취소되었습니다.`, { variant: 'success' });
      else
        enqueueSnackbar(`'좋아요'가 등록되었습니다.`, { variant: 'success' });
    },
    onError: (_, isLiked, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ['comments', commentRef.id],
          context.previousData
        );
      }
      if (isLiked)
        enqueueSnackbar(`'좋아요' 취소에 실패하였습니다.`, {
          variant: 'error',
        });
      else
        enqueueSnackbar(`'좋아요' 등록에 실패하였습니다.`, {
          variant: 'error',
        });
    },
  });

  const handleToggleLike = () => {
    if (!user) {
      enqueueSnackbar(`'좋아요'를 하려면 로그인이 필요합니다.`, {
        variant: 'error',
      });
      return;
    }
    if (isPending) return;
    toggleLike(isLiked);
  };

  if (!comment) return null;
  if (user && authorId === user.uid) return null;

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      height="25px"
    >
      <Button
        startIcon={isLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        onClick={handleToggleLike}
        sx={{
          padding: '0 5px',
          minWidth: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {likeCount}
      </Button>
    </Box>
  );
};

export default OtherCommentActions;
