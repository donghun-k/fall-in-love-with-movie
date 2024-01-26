import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

import useSearchInfiniteQuery from '../../hooks/search/useSearchInfiniteQuery';
import MovieCard from '../../components/ui/MovieCard';
import LoadingPage from '../../components/ui/LoadingPage';

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

  const handleViewMore = () => {
    fetchNextPage();
  };

  const { total_results: totalResult } = data?.pages[0] || { total_results: 0 };

  if (query.trim() === '') {
    navigate('/', { replace: true });
    return null;
  }

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <Helmet>
        <title>"{query}" 검색 결과 - FILM</title>
      </Helmet>
      <Box
        component="main"
        sx={{
          padding: { xs: '0px 30px', md: '0' },
        }}
      >
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
            의 검색 결과 <span className="total">{totalResult}</span>건
          </Typography>
          <Divider />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
              lg: 'repeat(5, 1fr)',
            },
            gap: '20px',
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
              <Button fullWidth size="large" onClick={handleViewMore}>
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
