import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SortIcon from '@mui/icons-material/Sort';
import CreateIcon from '@mui/icons-material/Create';
import MovieDetail from '../../types/MovieDetail';
import { useState, MouseEvent } from 'react';
import Comment from '../../types/Comment';
import CommentItem from './CommentItem';
import EditCommentScreen from './EditCommentScreen';
import useMyCommentQuery from '../../hooks/comment/useMyCommentQuery';
import useAuthContext from '../../hooks/useAuthContext';
import { User } from 'firebase/auth';

const COMMENT_LIST: Comment[] = [];

interface Props {
  movieDetail: MovieDetail;
}

const CommentSection = ({ movieDetail }: Props) => {
  const { id: movieId } = movieDetail;
  const [isEditCommentScreenOpened, setIsEditCommentScreenOpened] =
    useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user } = useAuthContext();
  const userId = user?.uid ?? '';
  const { data: myComment } = useMyCommentQuery({ movieId, userId });

  const handleSortMenuBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };
  const handleEditCommentScreenOpen = () => {
    setIsEditCommentScreenOpened(true);
  };
  const handleEditCommentScreenClose = () => {
    setIsEditCommentScreenOpened(false);
  };

  const props = {
    isEditCommentScreenOpened,
    anchorEl,
    open,
    handleSortMenuBtnClick,
    handleSortMenuClose,
    handleEditCommentScreenOpen,
    handleEditCommentScreenClose,
    movieId,
    user,
    myComment,
  };
  return <CommentSectionView {...props} />;
};

interface ViewProps {
  isEditCommentScreenOpened: boolean;
  anchorEl: null | HTMLElement;
  open: boolean;
  handleSortMenuBtnClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleSortMenuClose: () => void;
  handleEditCommentScreenOpen: () => void;
  handleEditCommentScreenClose: () => void;
  movieId: number;
  user: User | null;
  myComment: Comment | null;
}

const CommentSectionView = ({
  isEditCommentScreenOpened,
  anchorEl,
  open,
  handleSortMenuBtnClick,
  handleSortMenuClose,
  handleEditCommentScreenOpen,
  handleEditCommentScreenClose,
  // movieId,
  user,
  myComment,
}: ViewProps) => {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: { xs: '0 10px', md: '0' },
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
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
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
            }}
          >
            <ChatBubbleIcon />
            코멘트
          </Typography>
          <Button
            startIcon={<SortIcon />}
            size="large"
            onClick={handleSortMenuBtnClick}
          >
            정렬 기준
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleSortMenuClose}>
            <MenuItem onClick={handleSortMenuClose}>최신순</MenuItem>
            <MenuItem onClick={handleSortMenuClose}>공감순</MenuItem>
          </Menu>
        </Box>
        <Button
          onClick={handleEditCommentScreenOpen}
          startIcon={<CreateIcon />}
          variant="contained"
          size="small"
        >
          코멘트 작성
        </Button>
      </Box>
      <Divider sx={{ width: '100%' }} />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '10px 0',
        }}
      >
        {user && myComment && (
          <CommentItem comment={myComment} isMyComment={true} />
        )}
        {COMMENT_LIST.map((comment, i) => {
          return <CommentItem key={i} comment={comment} />;
        })}
      </Box>
      {isEditCommentScreenOpened && (
        <EditCommentScreen
          handleEditCommentScreenClose={handleEditCommentScreenClose}
        />
      )}
    </Box>
  );
};

export default CommentSection;
