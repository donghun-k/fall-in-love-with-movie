import useDeleteCommentMutation from '../../hooks/comment/useDeleteCommentMutation';
import useCommentExpand from '../../hooks/comment/useCommentExpand';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, Box, Button, Chip, Divider, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { convertTimestampToDateString } from '../../utils/date';
import MyComment from '../../models/MyComment';
import { useSnackbar } from 'notistack';

interface Props {
  movieId: number;
  myComment: MyComment;
  handleEditCommentDialogOpen: () => void;
}

const MyCommentItem = ({
  movieId,
  myComment,
  handleEditCommentDialogOpen,
}: Props) => {
  const commentRef = myComment.commentRef;
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteCommentMutate, isLoading: isDeletingComment } =
    useDeleteCommentMutation({
      commentRef,
    });
  const { expand, isOverflow, contentRef, handleExpand } = useCommentExpand();

  const handleDeleteComment = async () => {
    try {
      await deleteCommentMutate();
      queryClient.resetQueries(['myComments']);
      queryClient.resetQueries(['myRatings']);
      enqueueSnackbar('댓글이 삭제되었습니다.', {
        variant: 'success',
      });
      queryClient.invalidateQueries(['myComment', movieId]);
    } catch (error) {
      enqueueSnackbar('댓글 삭제에 실패하였습니다.', {
        variant: 'error',
      });
    }
  };

  const props = {
    myComment,
    expand,
    isOverflow,
    contentRef,
    handleExpand,
    handleEditCommentDialogOpen,
    handleDeleteComment,
    isDeletingComment,
  };

  return <MyCommentItemView {...props} />;
};

interface ViewProps {
  myComment: MyComment;
  expand: boolean;
  isOverflow: boolean;
  contentRef: React.RefObject<HTMLDivElement>;
  handleExpand: () => void;
  handleEditCommentDialogOpen: () => void;
  handleDeleteComment: () => void;
  isDeletingComment: boolean;
}

const MyCommentItemView = ({
  myComment,
  expand,
  isOverflow,
  contentRef,
  handleExpand,
  handleEditCommentDialogOpen,
  handleDeleteComment,
}: ViewProps) => {
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
      sx={{
        width: '100%',
        height: 'fit-content',
        padding: '10px',
        backgroundColor: 'background.paper',
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
            <Chip sx={{}} icon={<StarIcon />} label={rating} size="small" />
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
            maxHeight: `${expand ? 'none' : '60px'}`,
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
              onClick={handleEditCommentDialogOpen}
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
