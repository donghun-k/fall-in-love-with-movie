import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';

import BackdropSection from '../../components/movie/BackdropSection';
import MovieDetail from '../../models/MovieDetail';
import InfoSection from '../../components/movie/InfoSection';
import CommentSection from '../../components/movie/CommentSection';
import SimilarSection from '../../components/movie/SimilarSection';
import useMovieDetailQuery from '../../hooks/movie/useMovieDetailQuery';
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
      console.log('잘못된 접근입니다.');
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
  console.log(movieDetail);

  const props = {
    movieDetail,
  };

  return <MovieDetailPageView {...props} />;
};

interface ViewProps {
  movieDetail: MovieDetail;
}

const MovieDetailPageView = ({ movieDetail }: ViewProps) => {
  return (
    <>
      <Helmet>
        <title>{movieDetail.title} - FILM</title>
      </Helmet>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: '10px', sm: '30px' },
          marginBottom: '30px',
          padding: { xs: '0px 30px', md: '0' },
        }}
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
