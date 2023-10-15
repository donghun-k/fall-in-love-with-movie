import { Avatar, Box, Button, Chip, Divider, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import StarIcon from '@mui/icons-material/Star';
import Comment from '../../types/Comment';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useDeleteCommentMutation from '../../hooks/comment/useDeleteCommentMutation';
import { useQueryClient } from '@tanstack/react-query';
import { User } from 'firebase/auth';
import { convertTimestampToDateString } from '../../utils/date';
import useAddLikeMutation from '../../hooks/like/useAddLikeMutation';
import useDeleteLikeMutation from '../../hooks/like/useDeleteMutation';

interface Props {
  user: User | null;
  comment: Comment;
  isMyComment?: boolean;
  handleEditCommentDialogOpen?: () => void;
}

const CommentItem = ({
  user,
  comment,
  isMyComment = false,
  handleEditCommentDialogOpen,
}: Props) => {
  const queryClient = useQueryClient();
  const userId = user?.uid ?? '';
  const { authorId } = comment;
  const alreadyLiked = comment.likes.includes(userId);
  const { movieId } = useParams<{ movieId: string }>();
  const movieIdNum = Number(movieId);
  const { mutateAsync: deleteCommentMutate } = useDeleteCommentMutation({
    movieId: movieIdNum,
    authorId,
  });
  const { mutateAsync: addLikeMutate } = useAddLikeMutation({
    movieId: movieIdNum,
    commentAuthorId: authorId,
    userId,
  });
  const { mutateAsync: deleteLikeMutate } = useDeleteLikeMutation({
    movieId: movieIdNum,
    commentAuthorId: authorId,
    userId,
  });
  const [expand, setExpand] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflow(contentRef.current.scrollHeight > 60);
    }
  }, [contentRef]);

  const handleExpand = () => {
    setExpand((prev) => !prev);
  };

  const handleDeleteComment = async () => {
    if (userId !== authorId) {
      alert('You are not the author of this comment.');
      return;
    }
    try {
      await deleteCommentMutate();
      queryClient.invalidateQueries(['comment', movieIdNum, authorId]);
      queryClient.invalidateQueries(['comments', movieIdNum]);
    } catch (error) {
      alert(error);
    }
  };
  const handleAddLike = async () => {
    if (!user) {
      alert('You must log in to like a comment.');
      return;
    }
    if (userId === authorId) {
      alert('You cannot like your own comment.');
      return;
    }
    try {
      await addLikeMutate();
      queryClient.invalidateQueries(['comment', movieIdNum, authorId]);
      queryClient.invalidateQueries(['comments', movieIdNum]);
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
      queryClient.invalidateQueries(['comment', movieIdNum, authorId]);
      queryClient.invalidateQueries(['comments', movieIdNum]);
    } catch (error) {
      alert(error);
    }
  };

  const props = {
    user,
    comment,
    expand,
    handleExpand,
    handleEditCommentDialogOpen,
    handleDeleteComment,
    handleAddLike,
    handleDeleteLike,
    isOverflow,
    contentRef,
    isMyComment,
    alreadyLiked,
  };
  return <CommentItemView {...props} />;
};

interface ViewProps {
  user: User | null;
  comment: Comment;
  expand: boolean;
  handleExpand: () => void;
  handleEditCommentDialogOpen?: () => void;
  handleDeleteComment: () => void;
  handleAddLike: () => void;
  handleDeleteLike: () => void;
  isOverflow: boolean;
  contentRef: React.RefObject<HTMLDivElement>;
  isMyComment: boolean;
  alreadyLiked: boolean;
}

const CommentItemView = ({
  comment,
  expand,
  handleExpand,
  handleEditCommentDialogOpen,
  handleDeleteComment,
  handleAddLike,
  handleDeleteLike,
  isOverflow,
  contentRef,
  isMyComment,
  alreadyLiked,
}: ViewProps) => {
  const {
    username,
    userProfileImage,
    content,
    createdAt,
    isUpdated,
    rating,
    likeCount,
  } = comment;
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
        backgroundColor: `${isMyComment ? 'background.paper' : 'transparent'}`,
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
            {isMyComment ? '내 코멘트' : username}
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
          {isMyComment && (
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
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CommentItem;
