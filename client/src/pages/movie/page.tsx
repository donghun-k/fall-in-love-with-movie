import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';

import BackdropSection from './_components/BackdropSection';
import InfoSection from './_components/InfoSection';
import CommentSection from './_components/CommentSection';
import SimilarSection from './_components/SimilarSection';
import useMovieDetailQuery from '../../hooks/queries/useMovieDetailQuery';
import LoadingPage from '../../components/ui/LoadingPage';

const MovieDetailPage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const movieIdNumber = Number(movieId);
  const { data: movieDetail, isLoading } = useMovieDetailQuery({
    movieId: movieIdNumber,
  });

  useEffect(() => {
    if (Number.isNaN(movieIdNumber)) {
      enqueueSnackbar('잘못된 접근입니다.', {
        variant: 'error',
      });
      navigate('/');
      return;
    }
  }, [movieIdNumber, navigate]);

  useEffect(() => {
    if (!isLoading && !movieDetail) {
      enqueueSnackbar('영화 정보를 불러오는데 실패했습니다.', {
        variant: 'error',
      });
      navigate('/');
    }
  }, [isLoading, movieDetail, navigate]);

  if (isLoading) return <LoadingPage />;
  if (!movieDetail) return null;

  return (
    <>
      <Helmet>
        <title>{movieDetail.title} - FILM</title>
      </Helmet>
      <Box
        component="main"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={{ xs: '10px', sm: '30px' }}
        marginBottom="30px"
        padding={{ xs: '0px 30px', md: '0' }}
      >
        <BackdropSection movieDetail={movieDetail} />
        <InfoSection movieDetail={movieDetail} />
        <CommentSection movieDetail={movieDetail} />
        <SimilarSection movieId={movieDetail.id} />
      </Box>
    </>
  );
};
export default MovieDetailPage;
