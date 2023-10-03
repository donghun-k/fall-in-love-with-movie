import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';
import { Navigate, useSearchParams } from 'react-router-dom';
import useSearchInfiniteQuery from '../../hooks/useSearchInfiniteQuery';
import Movie from '../../types/Movie';
import MovieCard from '../../components/search/MovieCard';
import { useMemo } from 'react';

const SearchPage = () => {
  const [searchPrams] = useSearchParams();
  const query = searchPrams.get('query') || '';
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } =
    useSearchInfiniteQuery({ query });

  const movieList = useMemo(
    () => data?.pages.map((page) => page.results).flat() || [],
    [data]
  );

  const props = {
    query,
    isFetching,
    hasNextPage: hasNextPage || false,
    movieList,
    fetchNextPage,
  };

  if (query.trim() === '') return <Navigate to="/" />;

  if (isLoading)
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
  isFetching: boolean;
  hasNextPage: boolean;
  movieList: Movie[];
  fetchNextPage: () => void;
}

const SearchPageView = ({
  query,
  isFetching,
  hasNextPage,
  movieList,
  fetchNextPage,
}: ViewProps) => {
  return (
    <Box>
      <Box
        position="sticky"
        sx={{
          paddingTop: '5px',
          top: '80px',
          zIndex: 1,
          backgroundColor: 'background.default',
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

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
          paddingBottom: '20px',
        }}
      >
        {isFetching && <CircularProgress size="large" />}
        {!isFetching && hasNextPage && (
          <>
            <Button size="large" onClick={fetchNextPage}>
              View More
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SearchPage;
