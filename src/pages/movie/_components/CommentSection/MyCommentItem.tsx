import { useQueryClient } from '@tanstack/react-query';
import { Avatar, Box, Button, Chip, Divider, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useSnackbar } from 'notistack';

import { convertTimestampToDateString } from '../../../../utils/date';
import MyComment from '../../../../models/MyComment';
import useCommentExpand from '../../../../hooks/comment/useCommentExpand';
import useDeleteCommentMutation from '../../../../hooks/comment/useDeleteCommentMutation';

interface Props {
  movieId: number;
  myComment: MyComment;
  handleOpenDialog: () => void;
}

const MyCommentItem = ({ movieId, myComment, handleOpenDialog }: Props) => {
  const commentRef = myComment.commentRef;
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate: deleteComment } = useDeleteCommentMutation({
    commentRef,
    onSuccess: () => {
      enqueueSnackbar('댓글이 삭제되었습니다.', {
        variant: 'success',
      });
      queryClient.resetQueries({
        queryKey: ['myComments'],
      });
      queryClient.resetQueries({
        queryKey: ['myRatings'],
      });
      queryClient.invalidateQueries({
        queryKey: ['myComment', movieId],
      });
    },
    onError: () => {
      enqueueSnackbar('댓글 삭제에 실패하였습니다.', {
        variant: 'error',
      });
    },
  });
  const { expand, isOverflow, contentRef, handleExpand } = useCommentExpand();

  const handleDeleteComment = () => {
    deleteComment();
  };

  const {
    username,
    userProfileImage,
    createdAt,
    isUpdated,
    rating,
    content,
    likeCount,
  } = myComment;
  return (
    <Box
      width="100%"
      height="fit-content"
      padding="10px"
      bgcolor="background.paper"
      borderRadius="10px"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        width="100%"
        height="fit-content"
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          height="40px"
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap="10px"
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
                display="flex"
                flexDirection="row"
                alignItems="flex-end"
                gap="5px"
                fontSize={{ xs: '0.8rem', sm: '1rem' }}
              >
                {username}
              </Typography>
              <Typography
                fontSize={{ xs: '0.6rem', sm: '0.8rem' }}
                color="text.secondary"
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
          width="100%"
          height="fit-content"
          maxHeight={expand ? 'none' : '60px'}
          lineHeight="20px"
          fontSize={{ xs: '0.8rem', sm: '1rem' }}
          color="text.secondary"
          overflow="hidden"
          paddingRight="5px"
          sx={{
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
          display="flex"
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
            startIcon={<ThumbUpOffAltIcon />}
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
          <Box
            sx={{
              width: 'fit-content',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            <Button
              onClick={handleOpenDialog}
              sx={{
                minWidth: 'fit-content',
                padding: '0 5px',
              }}
            >
              수정
            </Button>
            <Button
              onClick={handleDeleteComment}
              sx={{
                minWidth: 'fit-content',
                padding: '0 5px',
              }}
            >
              삭제
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MyCommentItem;