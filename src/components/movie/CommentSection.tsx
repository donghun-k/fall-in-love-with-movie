import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SortIcon from '@mui/icons-material/Sort';
import CreateIcon from '@mui/icons-material/Create';
import MovieDetail from '../../types/MovieDetail';
import { useState, MouseEvent, useEffect } from 'react';
import CommentItem from './CommentItem';
import EditCommentDialog from './EditCommentDialog';
import useAuthContext from '../../hooks/useAuthContext';
import { User } from 'firebase/auth';
import { SortOptionType } from '../../api/comment';
import MyCommentItem from './MyCommentItem';
import useCommentRefsInfiniteQuery from '../../hooks/comment/useCommentRefsInfiniteQuery';
import { DocumentReference } from 'firebase/firestore';
import useMyCommentQuery from '../../hooks/comment/useMyCommentQuery';
import MyComment from '../../types/MyComment';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  movieDetail: MovieDetail;
}

const CommentSection = ({ movieDetail }: Props) => {
  const { id: movieId } = movieDetail;
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const [isEditCommentDialogOpened, setIsEditCommentDialogOpened] =
    useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortOption, setSortOption] = useState<SortOptionType>('latest');
  const { data: myComment } = useMyCommentQuery({
    movieId,
    authorId: user?.uid ?? '',
  });
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: isCommentRefsLoading,
    isFetching: isCommentRefsFetching,
  } = useCommentRefsInfiniteQuery({
    movieId,
    sortOption,
  });
  const commentRefs = data?.pages.flatMap((ref) => ref);
  const openSortMenu = Boolean(anchorEl);

  useEffect(() => {
    queryClient.resetQueries(['comments', movieId]);
  }, [queryClient, movieId]);

  const handleSetSortOption = (event: MouseEvent<HTMLLIElement>) => {
    const value = event.currentTarget.dataset.value as SortOptionType;
    console.log(value);
    setSortOption(value);
    setAnchorEl(null);
  };
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
    openSortMenu,
    handleSetSortOption,
    handleSortMenuBtnClick,
    handleSortMenuClose,
    handleEditCommentDialogOpen,
    handleEditCommentDialogClose,
    movieId,
    user,
    myComment,
    commentRefs,
    hasNextPage,
    fetchNextPage,
    isCommentRefsLoading,
    isCommentRefsFetching,
  };
  return <CommentSectionView {...props} />;
};

interface ViewProps {
  isEditCommentDialogOpened: boolean;
  anchorEl: null | HTMLElement;
  openSortMenu: boolean;
  handleSetSortOption: (event: MouseEvent<HTMLLIElement>) => void;
  handleSortMenuBtnClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleSortMenuClose: () => void;
  handleEditCommentDialogOpen: () => void;
  handleEditCommentDialogClose: () => void;
  movieId: number;
  user: User | null;
  myComment: MyComment | undefined | null;
  commentRefs: DocumentReference[] | undefined;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  isCommentRefsLoading: boolean;
  isCommentRefsFetching: boolean;
}

const CommentSectionView = ({
  isEditCommentDialogOpened,
  anchorEl,
  openSortMenu,
  handleSetSortOption,
  handleSortMenuBtnClick,
  handleSortMenuClose,
  handleEditCommentDialogOpen,
  handleEditCommentDialogClose,
  movieId,
  user,
  myComment,
  commentRefs,
  hasNextPage,
  fetchNextPage,
  isCommentRefsLoading,
  isCommentRefsFetching,
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
          <Menu
            anchorEl={anchorEl}
            open={openSortMenu}
            onClose={handleSortMenuClose}
          >
            <MenuItem data-value="latest" onClick={handleSetSortOption}>
              최신순
            </MenuItem>
            <MenuItem data-value="registered" onClick={handleSetSortOption}>
              등록순
            </MenuItem>
            <MenuItem data-value="likeCount" onClick={handleSetSortOption}>
              공감순
            </MenuItem>
            <MenuItem data-value="highRated" onClick={handleSetSortOption}>
              높은 별점순
            </MenuItem>
            <MenuItem data-value="lowRated" onClick={handleSetSortOption}>
              낮은 별점순
            </MenuItem>
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
          <MyCommentItem
            myComment={myComment}
            movieId={movieId}
            user={user}
            handleEditCommentDialogOpen={handleEditCommentDialogOpen}
          />
        )}
        {commentRefs &&
          commentRefs.map((commentRef, i) => {
            return <CommentItem key={i} user={user} commentRef={commentRef} />;
          })}
        {(isCommentRefsLoading || isCommentRefsFetching) && (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!isCommentRefsLoading && !isCommentRefsFetching && hasNextPage && (
          <Button
            onClick={fetchNextPage}
            sx={{
              width: '100%',
              padding: '10px 0',
            }}
          >
            더보기
          </Button>
        )}
        {commentRefs && commentRefs?.length === 0 && (
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
          myComment={myComment ?? undefined}
          handleEditCommentDialogClose={handleEditCommentDialogClose}
        />
      )}
    </Box>
  );
};

export default CommentSection;
