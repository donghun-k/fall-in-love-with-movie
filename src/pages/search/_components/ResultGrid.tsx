import { Box } from '@mui/material';

import MovieCard from '../../../components/ui/MovieCard';
import Movie from '../../../models/Movie';

interface Props {
  movieList: Movie[];
}

const ResultGrid = ({ movieList }: Props) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(2, 1fr)',
        sm: 'repeat(3, 1fr)',
        md: 'repeat(4, 1fr)',
        lg: 'repeat(5, 1fr)',
      }}
      gap="20px"
    >
      {movieList.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Box>
  );
};

export default ResultGrid;
