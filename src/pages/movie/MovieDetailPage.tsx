import { Box } from '@mui/material';
import BackdropSection from '../../components/movie/BackdropSection';
import MovieDetail from '../../types/MovieDetail';
import InfoSection from '../../components/movie/InfoSection';
import CommentSection from '../../components/movie/CommentSection';
import SimilarSection from '../../components/movie/SimilarSection';
import { useParams } from 'react-router-dom';
import useMovieDetailQuery from '../../hooks/movie/useMovieDetailQuery';
import LoadingPage from '../../components/common/LoadingPage';

const MovieDetailPage = () => {
  const { movieId } = useParams();

  const movieIdNumber = Number(movieId);
  const { data: movieDetail, isLoading } = useMovieDetailQuery({
    movieId: movieIdNumber,
  });

  const props = {
    isLoading,
    movieDetail,
  };

  return <MovieDetailPageView {...props} />;
};

interface ViewProps {
  isLoading: boolean;
  movieDetail?: MovieDetail;
}

const MovieDetailPageView = ({ isLoading, movieDetail }: ViewProps) => {
  if (isLoading) return <LoadingPage />;
  if (!movieDetail) {
    return null;
  }
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: '10px', sm: '30px' },
        marginBottom: '30px',
      }}
    >
      <BackdropSection movieDetail={movieDetail} />
      <InfoSection movieDetail={movieDetail} />
      <CommentSection movieDetail={movieDetail} />
      <SimilarSection movieId={movieDetail.id} />
    </Box>
  );
};
export default MovieDetailPage;
