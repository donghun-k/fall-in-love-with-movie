import { Avatar, Box, Button, Chip, Divider, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import StarIcon from '@mui/icons-material/Star';
import Comment from '../../types/Comment';
import { User } from 'firebase/auth';
import { convertTimestampToDateString } from '../../utils/date';
import useAddLikeMutation from '../../hooks/like/useAddLikeMutation';
import useDeleteLikeMutation from '../../hooks/like/useDeleteMutation';
import useCommentExpand from '../../hooks/comment/useCommentExpand';
import { useEffect, useState } from 'react';

interface Props {
  user: User | null;
  comment: Comment;
}

const CommentItem = ({ user, comment }: Props) => {
  const userId = user?.uid ?? '';
  const { commentRef, likeCount: likeCnt } = comment;
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { mutateAsync: addLikeMutate } = useAddLikeMutation({
    commentRef,
    userId,
  });
  const { mutateAsync: deleteLikeMutate } = useDeleteLikeMutation({
    commentRef,
    userId,
  });
  const { expand, isOverflow, contentRef, handleExpand } = useCommentExpand();

  useEffect(() => {
    setAlreadyLiked(comment.likes.includes(userId));
  }, [comment.likes, userId]);
  useEffect(() => {
    setLikeCount(likeCnt);
  }, [likeCnt]);

  const handleAddLike = async () => {
    if (!user) {
      alert('공감 하려면 로그인이 필요합니다.');
      return;
    }
    try {
      await addLikeMutate();
      setAlreadyLiked(true);
      setLikeCount((prev) => prev + 1);
    } catch (error) {
      alert(error);
    }
  };
  const handleDeleteLike = async () => {
    if (!user) {
      alert('공감 하려면 로그인이 필요합니다.');
      return;
    }
    try {
      await deleteLikeMutate();
      setAlreadyLiked(false);
      setLikeCount((prev) => prev - 1);
    } catch (error) {
      alert(error);
    }
  };

  const props = {
    user,
    comment,
    expand,
    handleExpand,
    handleAddLike,
    handleDeleteLike,
    isOverflow,
    contentRef,
    alreadyLiked,
    likeCount,
  };
  return <CommentItemView {...props} />;
};

interface ViewProps {
  user: User | null;
  comment: Comment | undefined;
  expand: boolean;
  handleExpand: () => void;
  handleAddLike: () => void;
  handleDeleteLike: () => void;
  isOverflow: boolean;
  contentRef: React.RefObject<HTMLDivElement>;
  alreadyLiked: boolean;
  likeCount: number;
}

const CommentItemView = ({
  user,
  comment,
  expand,
  handleExpand,
  handleAddLike,
  handleDeleteLike,
  isOverflow,
  contentRef,
  alreadyLiked,
  likeCount,
}: ViewProps) => {
  if (!comment) return null;
  const {
    authorId,
    username,
    userProfileImage,
    content,
    createdAt,
    isUpdated,
    rating,
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
        <Avatar
          src={userProfileImage}
          sx={{
            width: '50px',
            height: '50px',
            '& img': {
              filter: 'grayscale(100%)',
              transition: 'filter 0.5s ease',
              '&:hover': {
                filter: 'grayscale(0%)',
              },
            },
          }}
        />
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
