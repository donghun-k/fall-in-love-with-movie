import {
  Box,
  Button,
  CircularProgress,
  Rating,
  Typography,
} from '@mui/material';
import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';

import useMyRatingQuery from '../../../../hooks/queries/useMyRatingQuery';
import useUpdateRatingMutation from '../../../../hooks/mutations/useUpdateRatingMutation';
import MovieDetail from '../../../../models/MovieDetail';
import { RootState } from '../../../../store';
interface Props {
  movieDetail: MovieDetail;
}

const RatingBox = ({ movieDetail }: Props) => {
  const { id: movieId, title: movieTitle, genres } = movieDetail;
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { user, isCheckingAuth } = useSelector(
    (state: RootState) => state.auth,
  );
  const movieGenreIds = genres.map((genre) => genre.id);

  const {
    data: rating = 0,
    isLoading: isRatingLoading,
    isFetching: isRatingFetching,
  } = useMyRatingQuery({
    movieId,
  });
  const { mutate: updateRating, isPending } = useUpdateRatingMutation({
    movieId,
    movieTitle,
    movieGenreIds,
    onSuccess: () => {
      enqueueSnackbar('별점이 변경되었습니다.', {
        variant: 'success',
      });
      queryClient.resetQueries({
        queryKey: ['myComments'],
      });
      queryClient.resetQueries({
        queryKey: ['myRatings'],
      });
      queryClient.invalidateQueries({
        queryKey: ['myRating', movieId],
      });
      queryClient.invalidateQueries({
        queryKey: ['myComment', movieId],
      });
      queryClient.invalidateQueries({
        queryKey: ['ratingStatistics', movieId],
      });
    },
    onError: () => {
      enqueueSnackbar('별점 변경에 실패하였습니다.', {
        variant: 'error',
      });
    },
  });

  const handleUpdateRating = (_: SyntheticEvent, value: number | null) => {
    updateRating(value ?? 0);
  };

  if (
    isCheckingAuth ||
    (user && (isRatingLoading || isRatingFetching || isPending))
  ) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height={{ xs: '20%', sm: '15%' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column-reverse', md: 'row' }}
      justifyContent={user ? 'space-between' : 'center'}
      alignItems="center"
      width="100%"
      height={{ xs: '20%', md: '15%' }}
      padding="10px"
    >
      {user ? (
        <>
          <Box>
            <Rating
              max={10}
              value={rating ?? 0}
              onChange={handleUpdateRating}
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
            display="flex"
            flexDirection={{ xs: 'row-reverse', md: 'column' }}
            alignItems={{ xs: 'center', md: 'flex-end' }}
            textAlign={{ xs: 'center', md: 'right' }}
            gap={{ xs: '10px', md: '0px' }}
          >
            {rating !== 0 ? (
              <Box
                display="flex"
                flexDirection={{ xs: 'row-reverse', md: 'column' }}
                alignItems={{ xs: 'center', md: 'flex-end' }}
                gap={{ xs: '10px', md: '0px' }}
              >
                <Typography
                  fontSize={{ xs: '1.5rem', sm: '1rem', md: '1.5rem' }}
                >
                  {rating}
                </Typography>
                <Typography fontSize=".8rem" color="text.secondary">
                  내 별점
                </Typography>
              </Box>
            ) : (
              <Typography
                fontSize={{ xs: '1.2rem', sm: '1rem', md: '1.2rem' }}
                color="text.secondary"
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
