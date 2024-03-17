import { Avatar, Box, Chip, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import { convertTimestampToDateString } from '../../../../../utils/date';

interface Props {
  username: string;
  userProfileImage: string;
  createdAt: number;
  isUpdated: boolean;
  rating: number | null;
}

const CommentHeader = ({
  username,
  userProfileImage,
  createdAt,
  isUpdated,
  rating,
}: Props) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      height="40px"
    >
      <Box display="flex" flexDirection="row" alignContent="center" gap="10px">
        <Avatar
          src={userProfileImage}
          alt={username}
          sx={{
            width: '40px',
            height: '40px',
          }}
        />
        <Box>
          <Typography
            display="flex"
            flexDirection="row"
            alignItems="flex-end"
            fontSize={{ xs: '0.8rem', sm: '1rem' }}
            gap="5px"
          >
            {username}
          </Typography>
          <Typography
            fontSize={{ xs: '0.6rem', sm: '0.8rem' }}
            color="text.secondary"
          >
            {convertTimestampToDateString(createdAt)}
            {isUpdated && ' (수정됨)'}
          </Typography>
        </Box>
      </Box>
      {Boolean(rating) && (
        <Chip icon={<StarIcon />} label={rating} size="small" />
      )}
    </Box>
  );
};

export default CommentHeader;
