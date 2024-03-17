import { Box, Typography } from '@mui/material';
import TheatersIcon from '@mui/icons-material/Theaters';

import MovieCard from '../../../components/ui/MovieCard';
import useSimilarMoviesQuery from '../../../hooks/queries/useSimilarMoviesQuery';

interface Props {
  movieId: number;
}

const SimilarSection = ({ movieId }: Props) => {
  const { data: similarMovies } = useSimilarMoviesQuery({ movieId });

  if (similarMovies?.length === 0) return null;

  if (!similarMovies) return null;
  return (
    <Box
      component="section"
      display="flex"
      flexDirection="column"
      width="100%"
      gap="10px"
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
        <Typography
          display="flex"
          alignItems="center"
          gap="10px"
          fontSize={{ xs: '1.2rem', sm: '1.5rem' }}
        >
          <TheatersIcon />
          비슷한 영화
        </Typography>
      </Box>
      <Box width="100%" height="100%">
        <Box
          display="flex"
          flexDirection="row"
          gap="20px"
          width="100%"
          paddingBottom="15px"
          sx={{
            overflowX: 'scroll',
          }}
        >
          {similarMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SimilarSection;
