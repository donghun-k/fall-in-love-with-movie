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
import { useState, MouseEvent, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import MovieDetail from '../../../../models/MovieDetail';
import CommentItem from './CommentItem';
import { SortOptionType } from '../../../../services/comment';
import MyCommentItem from './MyCommentItem';
import useCommentsInfiniteQuery from '../../../../hooks/comment/useCommentsInfiniteQuery';
import useMyCommentQuery from '../../../../hooks/comment/useMyCommentQuery';
import { RootState } from '../../../../store';
import useDialog from '../../../../hooks/useDialog';
interface Props {
  movieDetail: MovieDetail;
}

const CommentSection = ({ movieDetail }: Props) => {
  const { id: movieId } = movieDetail;
  const queryClient = useQueryClient();

  const { user } = useSelector((state: RootState) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortOption, setSortOption] = useState<SortOptionType>('latest');
  const { data: myComment } = useMyCommentQuery({
    movieId,
  });
  const { openDialog } = useDialog();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: isCommentsLoading,
    isFetching: isCommentsFetching,
    updateLikesOptimistically,
  } = useCommentsInfiniteQuery({
    movieId,
    sortOption,
  });
  const comments = data?.pages
    .map((page) => page.comments)
    .flatMap((comment) => comment);
  const openSortMenu = Boolean(anchorEl);

  useEffect(() => {
    queryClient.resetQueries({
      queryKey: ['comments', movieId],
    });
  }, [queryClient, movieId]);

  const handleOpenDialog = () => {
    openDialog({ type: 'editComment', props: { movieDetail, myComment } });
  };

  const handleViewMoreComments = () => {
    fetchNextPage();
  };

  const handleSetSortOption = (event: MouseEvent<HTMLLIElement>) => {
    const value = event.currentTarget.dataset.value as SortOptionType;
    setSortOption(value);
    setAnchorEl(null);
  };
  const handleOpenSortMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSortMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      component="section"
      display="flex"
      flexDirection="column"
      width="100%"
      padding={{ xs: '0 10px', md: '0' }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        gap="10px"
      >
        <Box display="flex" flexDirection="row" alignItems="center" gap="10px">
          <Typography
            display="flex"
            alignItems="center"
            gap="10px"
            fontSize={{ xs: '1.2rem', sm: '1.5rem' }}
          >
            <ChatBubbleIcon />
            코멘트
          </Typography>
          <Button
            startIcon={<SortIcon />}
            size="large"
            onClick={handleOpenSortMenu}
          >
            정렬 기준
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openSortMenu}
            onClose={handleCloseSortMenu}
          >
            <MenuItem data-value="latest" onClick={handleSetSortOption}>
              최신순
            </MenuItem>
            <MenuItem data-value="registered" onClick={handleSetSortOption}>
              등록순
            </MenuItem>
            <MenuItem data-value="likeCount" onClick={handleSetSortOption}>
              좋아요순
            </MenuItem>
            <MenuItem data-value="highRated" onClick={handleSetSortOption}>
              높은 별점순
            </MenuItem>
            <MenuItem data-value="lowRated" onClick={handleSetSortOption}>
              낮은 별점순
            </MenuItem>
          </Menu>
        </Box>
        {user && !myComment && (
          <Button
            onClick={handleOpenDialog}
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
        display="flex"
        flexDirection="column"
        gap="10px"
        width="100%"
        padding="10px 0"
      >
        {user && myComment && (
          <MyCommentItem
            myComment={myComment}
            movieId={movieId}
            handleOpenDialog={handleOpenDialog}
          />
        )}
        {comments &&
          comments.map((comment, i) => {
            return (
              <CommentItem
                key={i}
                user={user}
                comment={comment}
                updateLikesOptimistically={updateLikesOptimistically}
              />
            );
          })}
        {(isCommentsLoading || isCommentsFetching) && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <CircularProgress />
          </Box>
        )}
        {!isCommentsLoading && !isCommentsFetching && hasNextPage && (
          <Button
            onClick={handleViewMoreComments}
            sx={{
              width: '100%',
              padding: '10px 0',
            }}
          >
            더 보기
          </Button>
        )}
        {comments && comments?.length === 0 && (
          <Typography fontSize={{ xs: '1rem', sm: '1.2rem' }} padding="10px 0">
            아직 이 영화에 대한 코멘트가 없습니다.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CommentSection;
