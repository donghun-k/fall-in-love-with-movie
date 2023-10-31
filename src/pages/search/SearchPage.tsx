import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSearchInfiniteQuery from '../../hooks/search/useSearchInfiniteQuery';
import Movie from '../../types/Movie';
import MovieCard from '../../components/common/MovieCard';
import { useMemo } from 'react';
import LoadingPage from '../../components/common/LoadingPage';
import { Helmet } from 'react-helmet-async';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchPrams] = useSearchParams();
  const query = searchPrams.get('query') || '';
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } =
    useSearchInfiniteQuery({ query });

  const movieList = useMemo(
    () => data?.pages.map((page) => page.results).flat() || [],
    [data]
  );

  const { total_results } = data?.pages[0] || { total_results: 0 };

  const props = {
    query,
    isFetching,
    hasNextPage: hasNextPage || false,
    total_results,
    movieList,
    fetchNextPage,
  };

  if (query.trim() === '') {
    navigate('/', { replace: true });
    return null;
  }

  if (isLoading) return <LoadingPage />;
  return <SearchPageView {...props} />;
};

interface ViewProps {
  query: string;
  isFetching: boolean;
  hasNextPage: boolean;
  total_results: number;
  movieList: Movie[];
  fetchNextPage: () => void;
}

const SearchPageView = ({
  query,
  isFetching,
  hasNextPage,
  total_results,
  movieList,
  fetchNextPage,
}: ViewProps) => {
  return (
    <>
      <Helmet>
        <title>"{query}" 검색 결과 - FILM</title>
      </Helmet>
      <Box component="main">
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
              fontSize: { xs: '.9rem', sm: '1.5rem' },
              '& .query': {
                color: 'text.primary',
                fontSize: { xs: '1.1rem', sm: '2rem' },
              },
              '& .total': {
                color: 'text.primary',
                fontSize: { xs: '1rem', sm: '1.5rem' },
              },
            }}
          >
            <span className="query">
              "
              {query.length > 8
                ? [...query].splice(0, 8).join('') + '...'
                : query}
              "
            </span>
            의 검색 결과 <span className="total">{total_results}</span>건
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
        {movieList.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
              padding: '50px',
            }}
          >
            <SentimentVeryDissatisfiedIcon sx={{ fontSize: '100px' }} />
            <Typography variant="h5">검색 결과가 없어요</Typography>
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            paddingBottom: '40px',
          }}
        >
          {isFetching && <CircularProgress />}
          {!isFetching && hasNextPage && (
            <>
              <Button fullWidth size="large" onClick={fetchNextPage}>
                더 보기
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SearchPage;
