import { Avatar, Box, Button, Chip, Divider, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import StarIcon from '@mui/icons-material/Star';
import Comment from '../../types/Comment';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useRatingQuery from '../../hooks/rating/useRatingQuery';
import useDeleteCommentMutation from '../../hooks/comment/useDeleteCommentMutation';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  comment: Comment;
  isMyComment?: boolean;
  handleEditCommentDialogOpen?: () => void;
}

const CommentItem = ({
  comment,
  isMyComment = false,
  handleEditCommentDialogOpen,
}: Props) => {
  const {
    userId,
    username,
    userProfileImage,
    content,
    createdAt,
    isUpdated,
    likes,
  } = comment;
  const createdAtString = new Date(createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  const queryClient = useQueryClient();
  const { movieId } = useParams<{ movieId: string }>();
  const movieIdNum = Number(movieId);
  const { data: rating = 0 } = useRatingQuery({ movieId: movieIdNum, userId });
  const { mutateAsync: deleteCommentMutate } = useDeleteCommentMutation({
    movieId: movieIdNum,
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
    try {
      await deleteCommentMutate();
      queryClient.invalidateQueries(['comment', movieIdNum, userId]);
    } catch (error) {
      alert(error);
    }
  };

  const props = {
    username,
    userProfileImage,
    rating,
    content,
    likes,
    createdAt: createdAtString,
    isUpdated,
    expand,
    handleExpand,
    handleEditCommentDialogOpen,
    handleDeleteComment,
    isOverflow,
    contentRef,
    isMyComment,
  };
  return <CommentItemView {...props} />;
};

interface ViewProps {
  username: string;
  userProfileImage: string;
  rating: number;
  content: string;
  likes: number;
  createdAt: string;
  isUpdated: boolean;
  expand: boolean;
  handleExpand: () => void;
  handleEditCommentDialogOpen?: () => void;
  handleDeleteComment: () => void;
  isOverflow: boolean;
  contentRef: React.RefObject<HTMLDivElement>;
  isMyComment: boolean;
}

const CommentItemView = ({
  username,
  userProfileImage,
  rating,
  content,
  likes,
  createdAt,
  isUpdated,
  expand,
  handleExpand,
  handleEditCommentDialogOpen,
  handleDeleteComment,
  isOverflow,
  contentRef,
  isMyComment,
}: ViewProps) => {
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
              {createdAt}
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
            startIcon={<ThumbUpIcon />}
            sx={{
              padding: '0 5px',
              minWidth: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {likes}
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
