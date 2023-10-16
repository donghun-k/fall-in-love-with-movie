import { User } from 'firebase/auth';
import useDeleteCommentMutation from '../../hooks/comment/useDeleteCommentMutation';
import useCommentExpand from '../../hooks/comment/useCommentExpand';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, Box, Button, Chip, Divider, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { convertTimestampToDateString } from '../../utils/date';
import MyComment from '../../types/MyComment';

interface Props {
  user: User;
  movieId: number;
  myComment: MyComment;
  handleEditCommentDialogOpen: () => void;
}

const MyCommentItem = ({
  user,
  movieId,
  myComment,
  handleEditCommentDialogOpen,
}: Props) => {
  const userId = user.uid;
  const commentRef = myComment.commentRef;
  const queryClient = useQueryClient();
  const { mutateAsync: deleteCommentMutate, isLoading: isDeletingComment } =
    useDeleteCommentMutation({
      commentRef,
    });
  const { expand, isOverflow, contentRef, handleExpand } = useCommentExpand();

  const handleDeleteComment = async () => {
    try {
      await deleteCommentMutate();
      queryClient.invalidateQueries(['myComment', movieId, userId]);
    } catch (error) {
      alert(error);
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
  isDeletingComment,
}: ViewProps) => {
  if (isDeletingComment) return <Typography>삭제 중...</Typography>;
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: { xs: '10px', sm: '20px' },
        backgroundColor: 'background.paper',
        borderRadius: '10px',
      }}
    >
      <Box
        sx={{
          width: '50px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: '10px',
        }}
      >
        <Avatar src={userProfileImage} sx={{ width: '50px', height: '50px' }} />
      </Box>
      <Box
        sx={{
          width: 'calc(100% - 70px)',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
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
          <Typography
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              fontSize: { xs: '0.8rem', sm: '1rem' },
              gap: '5px',
              '& span': {
                fontSize: { xs: '0.6rem', sm: '0.8rem' },
                color: 'text.secondary',
              },
            }}
          >
            {username}
            <span>
              {convertTimestampToDateString(createdAt)}
              {isUpdated && ' (수정됨)'}
            </span>
          </Typography>
          {rating !== 0 && (
            <Chip sx={{}} icon={<StarIcon />} label={rating} size="small" />
          )}
        </Box>
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
            margin: '10px 0',
            paddingRight: '10px',
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
              padding: '0',
              marginBottom: '10px',
              fontSize: { xs: '0.8rem', sm: '1rem' },
            }}
            onClick={handleExpand}
          >
            {expand ? '접기' : '자세히 보기'}
          </Button>
        )}
        <Divider sx={{ width: '100%' }} />
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
