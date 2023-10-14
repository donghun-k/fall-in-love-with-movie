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

interface Props {
  handleEditCommentDialogClose: () => void;
}

const EditCommentDialog = ({ handleEditCommentDialogClose }: Props) => {
  const [commentContent, setCommentContent] = useState('');
  const [commentLength, setCommentLength] = useState(0);
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
      queryClient.invalidateQueries(['myComment', movieIdNum, user?.uid]);
    } catch (error) {
      alert(error);
    }
  };

  const props = {
    commentContent,
    commentLength,
    isPostingComment,
    handleCommentContentChange,
    handlePostComment,
    handleEditCommentDialogClose,
  };
  return <EditCommentDialogView {...props} />;
};

interface ViewProps {
  commentContent: string;
  commentLength: number;
  isPostingComment: boolean;
  handleCommentContentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePostComment: () => void;
  handleEditCommentDialogClose: () => void;
}

const EditCommentDialogView = ({
  commentContent,
  commentLength,
  isPostingComment,
  handleCommentContentChange,
  handlePostComment,
  handleEditCommentDialogClose,
}: ViewProps) => {
  if (isPostingComment) return <LoadingBackdrop />;
  return (
    <Dialog open={true} fullWidth={true}>
      <DialogTitle>코멘트 작성</DialogTitle>
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
        <Button variant="contained" onClick={handlePostComment}>
          작성
        </Button>
        <Button variant="contained" onClick={handleEditCommentDialogClose}>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCommentDialog;
