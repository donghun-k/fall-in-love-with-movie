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
import EditCommentDialog from './EditCommentDialog';
import useCommentQuery from '../../hooks/comment/useCommentQuery';
import useAuthContext from '../../hooks/useAuthContext';
import { User } from 'firebase/auth';
import useCommentsQuery from '../../hooks/comment/useCommentsQuery';

interface Props {
  movieDetail: MovieDetail;
}

const CommentSection = ({ movieDetail }: Props) => {
  const { id: movieId } = movieDetail;
  const [isEditCommentDialogOpened, setIsEditCommentDialogOpened] =
    useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user } = useAuthContext();
  const userId = user?.uid ?? '';
  const { data: myComment } = useCommentQuery({ movieId, authorId: userId });
  const { data: comments = [] } = useCommentsQuery(
    user ? { movieId, userId } : { movieId }
  );

  const handleSortMenuBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };
  const handleEditCommentDialogOpen = () => {
    setIsEditCommentDialogOpened(true);
  };
  const handleEditCommentDialogClose = () => {
    setIsEditCommentDialogOpened(false);
  };

  const props = {
    isEditCommentDialogOpened,
    anchorEl,
    open,
    handleSortMenuBtnClick,
    handleSortMenuClose,
    handleEditCommentDialogOpen,
    handleEditCommentDialogClose,
    movieId,
    user,
    myComment,
    comments,
  };
  return <CommentSectionView {...props} />;
};

interface ViewProps {
  isEditCommentDialogOpened: boolean;
  anchorEl: null | HTMLElement;
  open: boolean;
  handleSortMenuBtnClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleSortMenuClose: () => void;
  handleEditCommentDialogOpen: () => void;
  handleEditCommentDialogClose: () => void;
  movieId: number;
  user: User | null;
  myComment: Comment | null | undefined;
  comments: Comment[];
}

const CommentSectionView = ({
  isEditCommentDialogOpened,
  anchorEl,
  open,
  handleSortMenuBtnClick,
  handleSortMenuClose,
  handleEditCommentDialogOpen,
  handleEditCommentDialogClose,
  // movieId,
  user,
  myComment,
  comments,
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
        {!myComment && (
          <Button
            onClick={handleEditCommentDialogOpen}
            startIcon={<CreateIcon />}
            variant="contained"
            size="small"
          >
            코멘트 작성
          </Button>
        )}
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
          <CommentItem
            user={user}
            comment={myComment}
            isMyComment={true}
            handleEditCommentDialogOpen={handleEditCommentDialogOpen}
          />
        )}
        {comments.map((comment, i) => {
          return <CommentItem key={i} user={user} comment={comment} />;
        })}
        {comments.length === 0 && !myComment && (
          <Typography
            sx={{
              padding: '10px 0',
              fontSize: { xs: '1rem', sm: '1.2rem' },
            }}
          >
            아직 이 영화에 대한 코멘트가 없습니다.
          </Typography>
        )}
      </Box>
      {isEditCommentDialogOpened && (
        <EditCommentDialog
          isUpdateMode={!!myComment}
          prevContent={myComment?.content}
          handleEditCommentDialogClose={handleEditCommentDialogClose}
        />
      )}
    </Box>
  );
};

export default CommentSection;
