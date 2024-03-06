import { Box } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

import useSearchInfiniteQuery from '../../hooks/search/useSearchInfiniteQuery';
import LoadingPage from '../../components/ui/LoadingPage';
import ResultHeader from './_components/ResultHeader';
import ResultGrid from './_components/ResultGrid';
import NoResultMessage from './_components/NoResultMessage';
import ViewMore from './_components/ViewMore';

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
      <Box component="main" padding={{ xs: '0px 30px', md: '0' }}>
        <ResultHeader query={query} totalResult={totalResult} />
        <ResultGrid movieList={movieList} />
        {movieList.length === 0 && <NoResultMessage />}
        <ViewMore
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          handleViewMore={handleViewMore}
        />
      </Box>
    </>
  );
};

export default SearchPage;
