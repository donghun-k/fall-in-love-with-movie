import {
  Box,
  Chip,
  Divider,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { MouseEvent } from 'react';

import Comment from '../../../../models/Comment';
import { convertTimestampToDateString } from '../../../../utils/date';

interface Props {
  comment: Comment;
  handleListItemClick: (e: MouseEvent<HTMLElement>) => void;
}

const CommentListItem = ({ comment, handleListItemClick }: Props) => {
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
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography
              fontSize={{ xs: '1rem', sm: '1.2rem' }}
              fontWeight="bold"
            >
              {comment.movieTitle}
            </Typography>
            <Typography fontSize="0.8rem" color="text.secondary">
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
          display="-webkit-box"
          width="100%"
          height="fit-content"
          maxHeight="60px"
          lineHeight="20px"
          fontSize={{ xs: '0.8rem', sm: '1rem' }}
          color="text.secondary"
          overflow="hidden"
          sx={{
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
