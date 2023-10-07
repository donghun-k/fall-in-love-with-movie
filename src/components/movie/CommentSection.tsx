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

const COMMENT_LIST: Comment[] = [
  {
    id: 1,
    movie_id: 123,
    user_id: 456,
    user_name: '사용자1',
    user_profile_image:
      'https://i.namu.wiki/i/yhh3NbZlYdrGJNc6R64ieh_fInzrtCstirGCZ53LSJYDhONJ_Myclj44BApVhg8NKw3NJf_8e2hePIsL2tGMYQ.webp',
    rating: 4,
    content:
      '이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요! 이 영화 정말 좋아요!',
    created_at: 1696695656298,
    updated_at: 1696653055888,
    isUpdated: true,
    likes: 10,
  },
  {
    id: 2,
    movie_id: 123,
    user_id: 789,
    user_name: '사용자2',
    user_profile_image:
      'https://i.namu.wiki/i/yhh3NbZlYdrGJNc6R64ieh_fInzrtCstirGCZ53LSJYDhONJ_Myclj44BApVhg8NKw3NJf_8e2hePIsL2tGMYQ.webp',
    rating: 5,
    content: '매우 감동적인 영화입니다.',
    created_at: 1696653055888,
    updated_at: 1696653055888,
    isUpdated: true,
    likes: 15,
  },
  {
    id: 3,
    movie_id: 456,
    user_id: 101,
    user_name: '사용자3',
    user_profile_image:
      'https://i.namu.wiki/i/yhh3NbZlYdrGJNc6R64ieh_fInzrtCstirGCZ53LSJYDhONJ_Myclj44BApVhg8NKw3NJf_8e2hePIsL2tGMYQ.webp',
    rating: 3,
    content: '별로에요.',
    created_at: 1696653055888,
    updated_at: 1696653055888,
    isUpdated: true,
    likes: 5,
  },
  {
    id: 4,
    movie_id: 789,
    user_id: 202,
    user_name: '사용자4',
    user_profile_image:
      'https://i.namu.wiki/i/yhh3NbZlYdrGJNc6R64ieh_fInzrtCstirGCZ53LSJYDhONJ_Myclj44BApVhg8NKw3NJf_8e2hePIsL2tGMYQ.webp',
    rating: 4,
    content: '재미있어요!',
    created_at: 1696653055888,
    updated_at: 1696653055888,
    isUpdated: true,
    likes: 8,
  },
  {
    id: 5,
    movie_id: 123,
    user_id: 303,
    user_name: '사용자5',
    user_profile_image:
      'https://i.namu.wiki/i/yhh3NbZlYdrGJNc6R64ieh_fInzrtCstirGCZ53LSJYDhONJ_Myclj44BApVhg8NKw3NJf_8e2hePIsL2tGMYQ.webp',
    rating: 5,
    content: '이 영화는 최고에요!',
    created_at: 1696653055888,
    updated_at: 1696653055898,
    isUpdated: true,
    likes: 12,
  },
];

interface Props {
  movieDetail: MovieDetail;
}

const CommentSection = ({ movieDetail }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { id } = movieDetail;

  const props = {
    anchorEl,
    open,
    handleClick,
    handleClose,
    id,
  };
  return <CommentSectionView {...props} />;
};

interface ViewProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
  id: number;
}

const CommentSectionView = ({
  anchorEl,
  open,
  handleClick,
  handleClose,
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
          <Button startIcon={<SortIcon />} size="large" onClick={handleClick}>
            정렬 기준
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>최신순</MenuItem>
            <MenuItem onClick={handleClose}>공감순</MenuItem>
          </Menu>
        </Box>
        <Button startIcon={<CreateIcon />} variant="contained" size="small">
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
        {COMMENT_LIST.map((comment, i) => {
          return (
            <CommentItem
              key={comment.id}
              comment={comment}
              isMyComment={i === 0}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default CommentSection;
