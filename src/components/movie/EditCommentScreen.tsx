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

interface Props {
  handleEditCommentScreenClose: () => void;
}

const EditCommentScreen = ({ handleEditCommentScreenClose }: Props) => {
  const [commentInput, setCommentInput] = useState('');
  const [commentLength, setCommentLength] = useState(0);

  const handleCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 300) return;
    setCommentInput(e.target.value);
    setCommentLength(e.target.value.length);
  };

  const props = {
    commentInput,
    commentLength,
    handleCommentInputChange,
    handleEditCommentScreenClose,
  };
  return <EditCommentScreenView {...props} />;
};

interface ViewProps {
  commentInput: string;
  commentLength: number;
  handleCommentInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditCommentScreenClose: () => void;
}

const EditCommentScreenView = ({
  commentInput,
  commentLength,
  handleCommentInputChange,
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
            value={commentInput}
            placeholder="300자 이내로 이 영화에 대한 코멘트를 남겨주세요."
            onChange={handleCommentInputChange}
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
          <Button variant="contained" onClick={handleEditCommentScreenClose}>
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
