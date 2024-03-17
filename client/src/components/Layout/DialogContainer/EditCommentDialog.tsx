import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import usePostCommentMutation from '../../../hooks/mutations/usePostCommentMutation';
import LoadingBackdrop from '../../ui/LoadingBackdrop';
import useUpdateCommentMutation from '../../../hooks/mutations/useUpdateCommentMutation';
import useMyRatingQuery from '../../../hooks/queries/useMyRatingQuery';
import Comment from '../../../models/Comment';
import MovieDetail from '../../../models/MovieDetail';
import useDialog from '../../../hooks/useDialog';

export interface Props {
  movieDetail: MovieDetail;
  myComment?: Comment | null;
}

const EditCommentDialog = ({ movieDetail, myComment }: Props) => {
  const { id: movieId, title: movieTitle } = movieDetail;
  const isUpdateMode = !!myComment;
  const prevContent = myComment?.content ?? '';
  const commentRef = myComment?.commentRef;
  const queryClient = useQueryClient();
  const { closeDialog } = useDialog();
  const { enqueueSnackbar } = useSnackbar();
  const commentInputRef = useRef<HTMLInputElement>(null);
  const commentLengthRef = useRef<HTMLDivElement>(null);
  const { data: rating } = useMyRatingQuery({
    movieId,
  });
  const { mutate: postComment, isPending: isPosting } = usePostCommentMutation({
    movieId,
    movieTitle,
    onSuccess: () => {
      enqueueSnackbar('코멘트가 작성되었습니다.', {
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
      enqueueSnackbar('코멘트 작성에 실패하였습니다.', {
        variant: 'error',
      });
    },
    onSettled: () => {
      closeDialog();
    },
  });
  const { mutate: updateComment, isPending: isUpdating } =
    useUpdateCommentMutation({
      commentRef: commentRef!,
      onSuccess: () => {
        enqueueSnackbar('코멘트가 수정되었습니다.', {
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
        enqueueSnackbar('코멘트 수정에 실패하였습니다.', {
          variant: 'error',
        });
      },
      onSettled: () => {
        closeDialog();
      },
    });

  const getCommentContent = () => {
    return commentInputRef.current?.value ?? '';
  };

  const handleCommentInput = () => {
    let content = getCommentContent();
    if (content.length > 300) {
      commentInputRef.current!.value = content.slice(0, 300);
      content = getCommentContent();
      enqueueSnackbar('코멘트는 300자 이내로 작성해주세요.', {
        variant: 'error',
      });
    }
    if (commentLengthRef.current === null) return;
    commentLengthRef.current.textContent = `${content.length} / 300`;
  };

  const handlePostComment = async () => {
    const commentContent = getCommentContent();
    if (commentContent.trim().length === 0) {
      enqueueSnackbar('내용을 입력해주세요.', {
        variant: 'error',
      });
      return;
    }
    if (commentContent.length > 300) {
      enqueueSnackbar('코멘트는 300자 이내로 작성해주세요.', {
        variant: 'error',
      });
      return;
    }
    postComment({
      content: commentContent,
      rating: rating ?? 0,
    });
  };

  const handleUpdateComment = async () => {
    const commentContent = getCommentContent();
    console.log(commentContent);
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
    if (commentContent.length > 300) {
      enqueueSnackbar('코멘트는 300자 이내로 작성해주세요.', {
        variant: 'error',
      });
      return;
    }
    updateComment(commentContent);
  };

  if (isPosting || isUpdating) return <LoadingBackdrop />;
  return (
    <Dialog open={true} fullWidth={true}>
      <DialogTitle>{isUpdateMode ? '코멘트 수정' : '코멘트 작성'}</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          defaultValue={prevContent}
          inputRef={commentInputRef}
          onInput={handleCommentInput}
          placeholder="300자 이내로 이 영화에 대한 코멘트를 남겨주세요."
          sx={{
            textarea: {
              fontSize: { xs: '0.8rem', sm: '1rem' },
            },
            marginBottom: '10px',
          }}
        />
        <Typography width="100%" padding="0 10px" ref={commentLengthRef}>
          {prevContent.length} / 300
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

        <Button variant="contained" onClick={closeDialog}>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCommentDialog;
