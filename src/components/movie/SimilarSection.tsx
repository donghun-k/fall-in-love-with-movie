import { Box, Typography } from '@mui/material';
import Movie from '../../types/Movie';
import MovieCard from '../common/MovieCard';
import TheatersIcon from '@mui/icons-material/Theaters';
import useSimilarMoviesQuery from '../../hooks/movie/useSimilarMoviesQuery';

interface Props {
  movieId: number;
}

const SimilarSection = ({ movieId }: Props) => {
  const { data: similarMovies } = useSimilarMoviesQuery({ movieId });
  const props = {
    similarMovies,
  };
  return <SimilarSectionView {...props} />;
};

interface ViewProps {
  similarMovies?: Movie[];
}

const SimilarSectionView = ({ similarMovies }: ViewProps) => {
  if (!similarMovies) return null;
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
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
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
          }}
        >
          <TheatersIcon />
          비슷한 영화
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
            paddingBottom: '15px',
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
