import { Box, Button } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

import useDeleteCommentMutation from '../../../../../hooks/mutations/useDeleteCommentMutation';
import Comment from '../../../../../models/Comment';

interface Props {
  movieId: number;
  myComment: Comment;
  handleOpenDialog: () => void;
}

const MyCommentActions = ({ movieId, myComment, handleOpenDialog }: Props) => {
  const { likeCount, commentRef } = myComment;
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

  const handleDeleteComment = () => {
    deleteComment();
  };
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
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        width="fit-content"
        gap="10px"
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
  );
};

export default MyCommentActions;
