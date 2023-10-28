import {
  Box,
  Button,
  CircularProgress,
  Rating,
  Typography,
} from '@mui/material';
import { SyntheticEvent } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import { User } from 'firebase/auth';
import { Link } from 'react-router-dom';
import useMyRatingQuery from '../../hooks/rating/useMyRatingQuery';
import { useQueryClient } from '@tanstack/react-query';
import usePostRatingMutation from '../../hooks/rating/usePostRatingMutation';
import MovieDetail from '../../types/MovieDetail';

interface Props {
  movieDetail: MovieDetail;
}

const RatingBox = ({ movieDetail }: Props) => {
  const queryClient = useQueryClient();
  const { id: movieId, title: movieTitle, genres } = movieDetail;
  const { user, isCheckingAuth } = useAuthContext();
  const movieGenreIds = genres.map((genre) => genre.id);

  const {
    data: rating = 0,
    isLoading: isRatingLoading,
    isFetching: isRatingFetching,
  } = useMyRatingQuery({
    movieId,
  });
  const { mutateAsync: postRating, isLoading: isPostingRating } =
    usePostRatingMutation({
      movieId,
      movieTitle,
      movieGenreIds,
    });

  const handleRatingChange = async (
    _: SyntheticEvent,
    value: number | null
  ) => {
    try {
      await postRating(value ?? 0);
      queryClient.invalidateQueries(['myRating', movieId]);
      queryClient.invalidateQueries(['myComment', movieId]);
      queryClient.invalidateQueries(['ratingStatistics', movieId]);
    } catch (error) {
      alert(error);
    }
  };

  if (
    isCheckingAuth ||
    (user && (isRatingLoading || isRatingFetching || isPostingRating))
  ) {
    return (
      <Box
        sx={{
          width: '100%',
          height: { xs: '20%', sm: '15%' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const props = {
    handleRatingChange,
    rating,
    user,
  };
  return <RatingBoxView {...props} />;
};

interface ViewProps {
  handleRatingChange: (event: SyntheticEvent, value: number | null) => void;
  rating: number;
  user: User | null;
}

const RatingBoxView = ({ user, rating, handleRatingChange }: ViewProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: '20%', sm: '15%' },
        display: 'flex',
        padding: '10px',
        flexDirection: { xs: 'column-reverse', sm: 'row' },
        justifyContent: user ? 'space-between' : 'center',
        alignItems: 'center',
      }}
    >
      {user ? (
        <>
          <Box>
            <Rating
              max={10}
              value={rating}
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
                  fontSize: { xs: '1.2rem', sm: '1rem', md: '1.2rem' },
                  color: 'text.secondary',
                }}
              >
                평가하기
              </Typography>
            )}
          </Box>
        </>
      ) : (
        <>
          <Link to="/signin">
            <Button size="large">로그인하고 별점 평가하기</Button>
          </Link>
        </>
      )}
    </Box>
  );
};

export default RatingBox;
