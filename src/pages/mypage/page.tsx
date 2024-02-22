import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import RatingChartAccordian from './_components/RatingChartAccordian';
import RatedMovieAccordian from './_components/RatedMovieAccordian';
import CommentAccordian from './_components/CommentAccordian';
import PreferredGenreAccordian from './_components/PreferredGenreAccordian';
import DeleteUserAccordian from './_components/DeleteUserAccordian';
import ProfileBox from './_components/ProfileBox';
import useMyRatingsQuery from '../../hooks/rating/useMyRatingsQuery';
import useMyCommentsQuery from '../../hooks/comment/useMyCommentsQuery';
import LoadingPage from '../../components/ui/LoadingPage';
import { RootState } from '../../store';

const MyPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: myRatings, isLoading: isMyRatingsLoading } =
    useMyRatingsQuery();
  const { data: myComments, isLoading: isMyCommentsLoading } =
    useMyCommentsQuery();

  if (!user) {
    return null;
  }
  if (isMyRatingsLoading || isMyCommentsLoading) return <LoadingPage />;

  if (!myRatings || !myComments) {
    enqueueSnackbar('내 정보를 불러오는데 실패하였습니다.', {
      variant: 'error',
    });
    navigate('/', { replace: true });
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{user.displayName}님의 페이지 - FILM</title>
      </Helmet>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: { xs: 'calc(100vh - 160px)', sm: 'calc(100vh - 80px)' },
          padding: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '500px',
            gap: '10px',
          }}
        >
          <ProfileBox user={user} />
          <RatingChartAccordian myRatings={myRatings} />
          <PreferredGenreAccordian myRatings={myRatings} />
          <RatedMovieAccordian myRatings={myRatings} />
          <CommentAccordian myComments={myComments} />
          <DeleteUserAccordian />
        </Box>
      </Box>
    </>
  );
};

export default MyPage;
