import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import { Navigate, useSearchParams } from 'react-router-dom';
import useSearchInfiniteQuery from '../../hooks/useSearchInfiniteQuery';
import Movie from '../../types/Movie';
import MovieCard from '../../components/search/MovieCard';

const SearchPage = () => {
  const [searchPrams] = useSearchParams();
  const query = searchPrams.get('query') || '';
  const { data, isLoading, isFetching } = useSearchInfiniteQuery({ query });

  if (query.trim() === '') return <Navigate to="/" />;

  const movieList = data?.pages.map((page) => page.results).flat() || [];

  const props = {
    query,
    movieList,
  };

  if (isLoading || isFetching)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );
  return <SearchPageView {...props} />;
};

interface ViewProps {
  query: string;
  movieList: Movie[];
}

const SearchPageView = ({ query, movieList }: ViewProps) => {
  return (
    <Box>
      <Box
        sx={{
          paddingTop: '5px',
        }}
      >
        <Typography
          sx={{
            padding: { xs: '10px 20px', sm: '10px 10px' },
            color: 'text.secondary',
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
            '& span': {
              color: 'text.primary',
              fontSize: { xs: '1.5rem', sm: '2rem' },
            },
          }}
        >
          <span>"{query}"</span>의 검색 결과
        </Typography>
        <Divider />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          padding: { xs: '10px 20px', md: '10px 10px' },
        }}
      >
        {movieList.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>
    </Box>
  );
};

export default SearchPage;
