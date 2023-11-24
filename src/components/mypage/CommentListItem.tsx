import {
  Box,
  Chip,
  Divider,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Comment from '../../models/Comment';
import { MouseEvent } from 'react';
import { convertTimestampToDateString } from '../../utils/date';

interface Props {
  comment: Comment;
  handleListItemClick: (e: MouseEvent<HTMLElement>) => void;
}

const CommentListItem = ({ comment, handleListItemClick }: Props) => {
  const props = {
    comment,
    handleListItemClick,
  };
  return <CommentListItemView {...props} />;
};

interface ViewProps {
  comment: Comment;
  handleListItemClick: (e: MouseEvent<HTMLElement>) => void;
}

const CommentListItemView = ({ comment, handleListItemClick }: ViewProps) => {
  return (
    <ListItem disablePadding key={comment.movieId}>
      <ListItemButton
        onClick={handleListItemClick}
        data-movie-id={comment.movieId}
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '1rem', sm: '1.2rem' },
                fontWeight: 'bold',
              }}
            >
              {comment.movieTitle}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.8rem',
                color: 'text.secondary',
              }}
            >
              {convertTimestampToDateString(comment.createdAt)}
            </Typography>
          </Box>
          <Chip icon={<StarIcon />} label={comment.rating} size="small" />
        </Box>
        <Divider
          sx={{
            width: '100%',
            margin: '5px',
          }}
        />
        <Typography
          sx={{
            width: '100%',
            fontSize: { xs: '0.8rem', sm: '1rem' },
            lineHeight: '20px',
            height: 'fit-content',
            maxHeight: '60px',
            color: 'text.secondary',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {comment.content}
        </Typography>
      </ListItemButton>
    </ListItem>
  );
};

export default CommentListItem;
