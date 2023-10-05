import { Box, Rating, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';

const RatingBox = () => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (_: SyntheticEvent, value: number | null) => {
    if (value !== null) {
      setRating(value);
    } else {
      setRating(0);
    }
  };

  const props = {
    handleRatingChange,
    rating,
  };
  return <RatingBoxView {...props} />;
};

interface ViewProps {
  handleRatingChange: (event: SyntheticEvent, value: number | null) => void;
  rating: number;
}

const RatingBoxView = ({ rating, handleRatingChange }: ViewProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: '20%', sm: '15%' },
        display: 'flex',
        padding: '10px',
        flexDirection: { xs: 'column-reverse', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box>
        <Rating
          max={10}
          defaultValue={rating}
          onChange={handleRatingChange}
          sx={{
            '&.MuiRating-root': {
              fontSize: { xs: '2rem', sm: '1.5rem', md: '2rem' },
            },
            '& .MuiRating-icon': {
              color: 'text.primary',
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row-reverse', sm: 'column' },
          alignItems: { xs: 'center', sm: 'flex-end' },
          textAlign: { xs: 'center', sm: 'right' },
          gap: { xs: '10px', sm: '0px' },
        }}
      >
        {rating !== 0 ? (
          <>
            <Typography
              sx={{
                fontSize: { xs: '1.5rem', sm: '1rem', md: '1.5rem' },
              }}
            >
              {rating}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '.8rem', sm: '.6rem', md: '.8rem' },
                color: 'text.secondary',
              }}
            >
              내 별점
            </Typography>
          </>
        ) : (
          <Typography
            sx={{
              fontSize: { sm: '1rem', md: '1.2rem' },
              color: 'text.secondary',
            }}
          >
            평가하기
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default RatingBox;
