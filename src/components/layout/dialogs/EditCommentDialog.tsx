import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import usePostCommentMutation from '../../../hooks/comment/usePostCommentMutation';
import LoadingBackdrop from '../../ui/LoadingBackdrop';
import useUpdateCommentMutation from '../../../hooks/comment/useUpdateCommentMutation';
import useMyRatingQuery from '../../../hooks/rating/useMyRatingQuery';
import MyComment from '../../../models/MyComment';
import MovieDetail from '../../../models/MovieDetail';
import useDialog from '../../../hooks/useDialog';

export interface Props {
  movieDetail: MovieDetail;
  myComment?: MyComment | null;
}

const EditCommentDialog = ({ movieDetail, myComment }: Props) => {
  const { id: movieId, title: movieTitle } = movieDetail;
  const isUpdateMode = !!myComment;
  const prevContent = myComment?.content ?? '';
  const commentRef = myComment?.commentRef;
  const { closeDialog } = useDialog();
  const { enqueueSnackbar } = useSnackbar();
  const [commentContent, setCommentContent] = useState(prevContent);
  const [commentLength, setCommentLength] = useState(prevContent.length);
  const { data: rating } = useMyRatingQuery({
    movieId,
  });
  const { mutateAsync: postCommentMutate, isPending: isPostingComment } =
    usePostCommentMutation({
      movieId,
      movieTitle,
    });
  const { mutateAsync: updateCommentMutate, isPending: isUpdatingComment } =
    useUpdateCommentMutation({
      commentRef: commentRef!,
    });

  const queryClient = useQueryClient();

  const handleCloseDialog = () => {
    closeDialog();
  };

  const handleCommentContentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value.length > 300) return;
    setCommentContent(e.target.value);
    setCommentLength(e.target.value.length);
  };

  const handlePostComment = async () => {
    if (commentContent.trim().length === 0) {
      enqueueSnackbar('내용을 입력해주세요.', {
        variant: 'error',
      });
      return;
    }
    try {
      await postCommentMutate({
        content: commentContent,
        rating: rating ?? 0,
      });
      enqueueSnackbar('코멘트가 작성되었습니다.', {
        variant: 'success',
      });
      handleCloseDialog();
      queryClient.resetQueries({
        queryKey: ['myComments'],
      });
      queryClient.resetQueries({
        queryKey: ['myRatings'],
      });
      queryClient.invalidateQueries({
        queryKey: ['myComment', movieId],
      });
    } catch (error) {
      enqueueSnackbar('코멘트 작성에 실패하였습니다.', {
        variant: 'error',
      });
    } finally {
      handleCloseDialog();
    }
  };

  const handleUpdateComment = async () => {
    if (prevContent === commentContent) {
      enqueueSnackbar('내용이 변경되지 않았습니다.', {
        variant: 'error',
      });
      return;
    }
    if (commentContent.trim().length === 0) {
      enqueueSnackbar('내용을 입력해주세요.', {
        variant: 'error',
      });
      return;
    }
    try {
      await updateCommentMutate(commentContent);
      handleCloseDialog();
      queryClient.resetQueries({
        queryKey: ['myComments'],
      });
      queryClient.resetQueries({
        queryKey: ['myRatings'],
      });
      queryClient.invalidateQueries({
        queryKey: ['myComment', movieId],
      });
    } catch (error) {
      enqueueSnackbar('코멘트 수정에 실패하였습니다.', {
        variant: 'error',
      });
    } finally {
      handleCloseDialog();
    }
  };

  if (isPostingComment || isUpdatingComment) return <LoadingBackdrop />;
  return (
    <Dialog open={true} fullWidth={true}>
      <DialogTitle>{isUpdateMode ? '코멘트 수정' : '코멘트 작성'}</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={commentContent}
          placeholder="300자 이내로 이 영화에 대한 코멘트를 남겨주세요."
          onChange={handleCommentContentChange}
          sx={{
            textarea: {
              fontSize: { xs: '0.8rem', sm: '1rem' },
            },
            marginBottom: '10px',
          }}
        />
        <Typography
          sx={{
            width: '100%',
            padding: '0 10px',
          }}
        >
          {commentLength} / 300
        </Typography>
      </DialogContent>
      <DialogActions>
        {isUpdateMode ? (
          <Button variant="contained" onClick={handleUpdateComment}>
            수정
          </Button>
        ) : (
          <Button variant="contained" onClick={handlePostComment}>
            작성
          </Button>
        )}

        <Button variant="contained" onClick={handleCloseDialog}>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCommentDialog;
