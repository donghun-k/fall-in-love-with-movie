import { Avatar, Box, Button, Chip, Divider, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import StarIcon from '@mui/icons-material/Star';
import Comment from '../../models/Comment';
import { User } from 'firebase/auth';
import { convertTimestampToDateString } from '../../utils/date';
import useCommentExpand from '../../hooks/comment/useCommentExpand';
import { useSnackbar } from 'notistack';
import { DocumentReference } from 'firebase/firestore';
import useUpdateLikeMutation from '../../hooks/like/useUpdateLikeMutation';

interface Props {
  user: User | null;
  comment: Comment;
  onLikeMutate: (
    commentRef: DocumentReference,
    option: 'add' | 'cancel'
  ) => Promise<() => void>;
}

const CommentItem = ({ user, comment, onLikeMutate }: Props) => {
  const userId = user?.uid ?? '';
  const { enqueueSnackbar } = useSnackbar();
  const { commentRef, likeCount } = comment;
  const { mutateAsync: updateLikeMutate, isLoading: isUpdatingLike } =
    useUpdateLikeMutation({
      commentRef,
    });
  const { expand, isOverflow, contentRef, handleExpand } = useCommentExpand();

  const alreadyLiked = comment.likes.includes(userId);

  const handleAddLike = async () => {
    if (!user) {
      enqueueSnackbar('공감 하려면 로그인이 필요합니다.', { variant: 'error' });
      return;
    }
    if (isUpdatingLike) return;

    const undo = await onLikeMutate(commentRef, 'add');

    try {
      await updateLikeMutate('add');
      enqueueSnackbar('공감이 등록되었습니다.', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('공감 등록에 실패하였습니다.', {
        variant: 'error',
      });
      undo();
    }
  };
  const handleDeleteLike = async () => {
    if (!user) {
      enqueueSnackbar('공감을 취소하려면 로그인이 필요합니다.', {
        variant: 'error',
      });
      return;
    }
    if (isUpdatingLike) return;

    const undo = await onLikeMutate(commentRef, 'cancel');

    try {
      await updateLikeMutate('cancel');
      enqueueSnackbar('공감이 취소되었습니다.', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('공감 취소에 실패하였습니다.', {
        variant: 'error',
      });
      undo();
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
