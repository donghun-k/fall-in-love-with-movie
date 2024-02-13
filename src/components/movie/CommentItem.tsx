import { Avatar, Box, Button, Chip, Divider, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import StarIcon from '@mui/icons-material/Star';
import { User } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

import Comment from '../../models/Comment';
import { convertTimestampToDateString } from '../../utils/date';
import useCommentExpand from '../../hooks/comment/useCommentExpand';
import useToggleLikeMutation from '../../hooks/likes/useToggleLikeMutation';
import { UpdateLikesOptimisticallyFn } from '../../hooks/comment/useCommentsInfiniteQuery';
interface CommentItemProps {
  user: User | null;
  comment: Comment;
  updateLikesOptimistically: UpdateLikesOptimisticallyFn;
}

const CommentItem = ({
  user,
  comment,
  updateLikesOptimistically,
}: CommentItemProps) => {
  const userId = user?.uid ?? '';
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const {
    commentRef,
    likeCount,
    likes,
    authorId,
    username,
    userProfileImage,
    content,
    createdAt,
    isUpdated,
    rating,
  } = comment;
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
  const { expand, isOverflow, contentRef, handleExpand } = useCommentExpand();

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
      sx={{
        width: '100%',
        height: 'fit-content',
        padding: '10px',
        backgroundColor: 'transparent',
        borderRadius: '10px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '40px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar
              src={userProfileImage}
              sx={{
                width: '40px',
                height: '40px',
              }}
            />
            <Box>
              <Typography
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  fontSize: { xs: '0.8rem', sm: '1rem' },
                  gap: '5px',
                }}
              >
                {username}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '0.6rem', sm: '0.8rem' },
                  color: 'text.secondary',
                }}
              >
                {convertTimestampToDateString(createdAt)}
                {isUpdated && ' (수정됨)'}
              </Typography>
            </Box>
          </Box>
          {Boolean(rating) && (
            <Chip icon={<StarIcon />} label={rating} size="small" />
          )}
        </Box>
        <Divider
          sx={{
            width: '100%',
            margin: '10px 0',
          }}
        />
        <Typography
          ref={contentRef}
          sx={{
            width: '100%',
            fontSize: { xs: '0.8rem', sm: '1rem' },
            lineHeight: '20px',
            height: 'fit-content',
            maxHeight: expand ? 'none' : '60px',
            color: 'text.secondary',
            overflow: 'hidden',
            paddingRight: '5px',
            ...(!expand && {
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }),
          }}
        >
          {content}
        </Typography>
        {isOverflow && (
          <Button
            sx={{
              minWidth: 'fit-content',
              padding: '5px 0',
              fontSize: { xs: '0.8rem', sm: '1rem' },
            }}
            onClick={handleExpand}
          >
            {expand ? '접기' : '자세히 보기'}
          </Button>
        )}
        <Divider
          sx={{
            width: '100%',
            margin: '10px 0',
          }}
        />
        <Box
          sx={{
            width: '100%',
            height: '25px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
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
      </Box>
    </Box>
  );
};

export default CommentItem;
