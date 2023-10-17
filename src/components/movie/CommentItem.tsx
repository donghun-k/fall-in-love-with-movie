import { Avatar, Box, Button, Chip, Divider, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import StarIcon from '@mui/icons-material/Star';
import Comment from '../../types/Comment';
import { useQueryClient } from '@tanstack/react-query';
import { User } from 'firebase/auth';
import { convertTimestampToDateString } from '../../utils/date';
import useAddLikeMutation from '../../hooks/like/useAddLikeMutation';
import useDeleteLikeMutation from '../../hooks/like/useDeleteMutation';
import { DocumentReference } from 'firebase/firestore';
import useCommentQuery from '../../hooks/comment/useCommentQuery';
import useCommentExpand from '../../hooks/comment/useCommentExpand';
import CommentItemSkeleton from './CommentItemSkeleton';

interface Props {
  user: User | null;
  commentRef: DocumentReference;
}

const CommentItem = ({ user, commentRef }: Props) => {
  const queryClient = useQueryClient();
  const userId = user?.uid ?? '';
  const { data: comment, isLoading: isCommentLoading } = useCommentQuery({
    commentRef,
  });
  const alreadyLiked = comment?.likes.includes(userId) ?? false;
  const { mutateAsync: addLikeMutate } = useAddLikeMutation({
    commentRef,
    userId,
  });
  const { mutateAsync: deleteLikeMutate } = useDeleteLikeMutation({
    commentRef,
    userId,
  });
  const { expand, isOverflow, contentRef, handleExpand } = useCommentExpand();

  const handleAddLike = async () => {
    if (!user) {
      alert('You must log in to like a comment.');
      return;
    }
    try {
      await addLikeMutate();
      queryClient.invalidateQueries(['comment', commentRef]);
    } catch (error) {
      alert(error);
    }
  };
  const handleDeleteLike = async () => {
    if (!user) {
      alert('You must log in to like a comment.');
      return;
    }
    try {
      await deleteLikeMutate();
      queryClient.invalidateQueries(['comment', commentRef]);
    } catch (error) {
      alert(error);
    }
  };

  const props = {
    user,
    comment,
    isCommentLoading,
    expand,
    handleExpand,
    handleAddLike,
    handleDeleteLike,
    isOverflow,
    contentRef,
    alreadyLiked,
  };
  return <CommentItemView {...props} />;
};

interface ViewProps {
  user: User | null;
  comment: Comment | undefined;
  isCommentLoading: boolean;
  expand: boolean;
  handleExpand: () => void;
  handleAddLike: () => void;
  handleDeleteLike: () => void;
  isOverflow: boolean;
  contentRef: React.RefObject<HTMLDivElement>;
  alreadyLiked: boolean;
}

const CommentItemView = ({
  user,
  comment,
  isCommentLoading,
  expand,
  handleExpand,
  handleAddLike,
  handleDeleteLike,
  isOverflow,
  contentRef,
  alreadyLiked,
}: ViewProps) => {
  if (!comment || isCommentLoading) return <CommentItemSkeleton />;
  const {
    authorId,
    username,
    userProfileImage,
    content,
    createdAt,
    isUpdated,
    rating,
    likeCount,
  } = comment;
  if (user && authorId === user.uid) return null;
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
        backgroundColor: 'transparent',
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
          {!isCommentLoading && rating !== 0 && (
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
            startIcon={alreadyLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
            onClick={alreadyLiked ? handleDeleteLike : handleAddLike}
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
