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
import useAuthContext from '../../hooks/useAuthContext';
import { useParams } from 'react-router-dom';
import usePostCommentMutation from '../../hooks/comment/usePostCommentMutation';
import LoadingBackdrop from '../common/LoadingBackdrop';
import { useQueryClient } from '@tanstack/react-query';
import useUpdateCommentMutation from '../../hooks/comment/useUpdateCommentMutation';

interface Props {
  isUpdateMode?: boolean;
  prevContent?: string;
  handleEditCommentDialogClose: () => void;
}

const EditCommentDialog = ({
  isUpdateMode = false,
  prevContent = '',
  handleEditCommentDialogClose,
}: Props) => {
  const [commentContent, setCommentContent] = useState(prevContent);
  const [commentLength, setCommentLength] = useState(prevContent.length);
  const { movieId } = useParams<{ movieId: string }>();
  const { user } = useAuthContext();
  const movieIdNum = Number(movieId);
  const { mutateAsync: postCommentMutate, isLoading: isPostingComment } =
    usePostCommentMutation({
      movieId: movieIdNum,
      userId: user?.uid ?? '',
      username: user?.displayName ?? '',
      userProfileImage: user?.photoURL ?? '',
    });
  const { mutateAsync: updateCommentMutate, isLoading: isUpdatingComment } =
    useUpdateCommentMutation({
      movieId: movieIdNum,
      userId: user?.uid ?? '',
      username: user?.displayName ?? '',
      userProfileImage: user?.photoURL ?? '',
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
    if (commentContent.length === 0) return;
    try {
      await postCommentMutate(commentContent);
      handleEditCommentDialogClose();
      queryClient.invalidateQueries(['comment', movieIdNum, user?.uid]);
    } catch (error) {
      alert(error);
    }
  };

  const handleUpdateComment = async () => {
    if (commentContent.length === 0) return;
    try {
      await updateCommentMutate(commentContent);
      handleEditCommentDialogClose();
      queryClient.invalidateQueries(['comment', movieIdNum, user?.uid]);
    } catch (error) {
      alert(error);
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
