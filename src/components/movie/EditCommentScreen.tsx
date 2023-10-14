import {
  Backdrop,
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
import { postComment } from '../../api/comment';

interface Props {
  handleEditCommentScreenClose: () => void;
}

const EditCommentScreen = ({ handleEditCommentScreenClose }: Props) => {
  const [commentContent, setCommentContent] = useState('');
  const [commentLength, setCommentLength] = useState(0);
  const { movieId } = useParams<{ movieId: string }>();
  const { user } = useAuthContext();
  const {
    uid: userId,
    displayName: username,
    photoURL: userProfileImage,
  } = user!;
  const movieIdNum = Number(movieId);

  const handleCommentContentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value.length > 300) return;
    setCommentContent(e.target.value);
    setCommentLength(e.target.value.length);
  };

  const handlePostComment = async () => {
    if (commentContent.length === 0) return;
    if (userId === null || username === null || userProfileImage === null)
      return;
    await postComment({
      movieId: movieIdNum,
      userId,
      username,
      userProfileImage,
      content: commentContent,
    });
    handleEditCommentScreenClose();
  };

  const props = {
    commentContent,
    commentLength,
    handleCommentContentChange,
    handlePostComment,
    handleEditCommentScreenClose,
  };
  return <EditCommentScreenView {...props} />;
};

interface ViewProps {
  commentContent: string;
  commentLength: number;
  handleCommentContentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePostComment: () => void;
  handleEditCommentScreenClose: () => void;
}

const EditCommentScreenView = ({
  commentContent,
  commentLength,
  handleCommentContentChange,
  handlePostComment,
  handleEditCommentScreenClose,
}: ViewProps) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      open={true}
    >
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
          <Button variant="contained" onClick={handleEditCommentScreenClose}>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </Backdrop>
  );
};

export default EditCommentScreen;
