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
import usePostCommentMutation from '../../hooks/comment/usePostCommentMutation';
import LoadingBackdrop from '../common/LoadingBackdrop';
import { useQueryClient } from '@tanstack/react-query';
import useUpdateCommentMutation from '../../hooks/comment/useUpdateCommentMutation';
import useMyRatingQuery from '../../hooks/rating/useMyRatingQuery';
import MyComment from '../../types/MyComment';
import MovieDetail from '../../types/MovieDetail';
import { useSnackbar } from 'notistack';

interface Props {
  movieDetail: MovieDetail;
  myComment?: MyComment;
  handleEditCommentDialogClose: () => void;
}

const EditCommentDialog = ({
  movieDetail,
  myComment,
  handleEditCommentDialogClose,
}: Props) => {
  const { id: movieId, title: movieTitle } = movieDetail;
  const isUpdateMode = !!myComment;
  const prevContent = myComment?.content ?? '';
  const commentRef = myComment?.commentRef;
  const { enqueueSnackbar } = useSnackbar();
  const [commentContent, setCommentContent] = useState(prevContent);
  const [commentLength, setCommentLength] = useState(prevContent.length);
  const { data: rating } = useMyRatingQuery({
    movieId,
  });
  const { mutateAsync: postCommentMutate, isLoading: isPostingComment } =
    usePostCommentMutation({
      movieId,
      movieTitle,
    });
  const { mutateAsync: updateCommentMutate, isLoading: isUpdatingComment } =
    useUpdateCommentMutation({
      commentRef: commentRef!,
    });

  const queryClient = useQueryClient();

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
      handleEditCommentDialogClose();
      queryClient.resetQueries(['myComments']);
      queryClient.resetQueries(['myRatings']);
      queryClient.invalidateQueries(['myComment', movieId]);
    } catch (error) {
      enqueueSnackbar('코멘트 작성에 실패하였습니다.', {
        variant: 'error',
      });
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
      await updateCommentMutate({ content: commentContent });
      handleEditCommentDialogClose();
      queryClient.resetQueries(['myComments']);
      queryClient.resetQueries(['myRatings']);
      queryClient.invalidateQueries(['myComment', movieId]);
    } catch (error) {
      enqueueSnackbar('코멘트 수정에 실패하였습니다.', {
        variant: 'error',
      });
    }
  };

  const props = {
    isUpdateMode,
    commentContent,
    commentLength,
    isPostingComment,
    isUpdatingComment,
    handleCommentContentChange,
    handlePostComment,
    handleUpdateComment,
    handleEditCommentDialogClose,
  };
  return <EditCommentDialogView {...props} />;
};

interface ViewProps {
  isUpdateMode: boolean;
  commentContent: string;
  commentLength: number;
  isPostingComment: boolean;
  isUpdatingComment: boolean;
  handleCommentContentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePostComment: () => void;
  handleUpdateComment: () => void;
  handleEditCommentDialogClose: () => void;
}

const EditCommentDialogView = ({
  isUpdateMode,
  commentContent,
  commentLength,
  isPostingComment,
  isUpdatingComment,
  handleCommentContentChange,
  handlePostComment,
  handleUpdateComment,
  handleEditCommentDialogClose,
}: ViewProps) => {
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

        <Button variant="contained" onClick={handleEditCommentDialogClose}>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCommentDialog;
