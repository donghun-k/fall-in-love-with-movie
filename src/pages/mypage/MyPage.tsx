import { Box } from '@mui/material';
import RatingChartAccordian from '../../components/mypage/RatingChartAccordian';
import RatedMovieAccordian from '../../components/mypage/RatedMovieAccordian';
import CommentAccordian from '../../components/mypage/CommentAccordian';
import PreferredGenreAccordian from '../../components/mypage/PreferredGenreAccordian';
import DeleteUserAccordian from '../../components/mypage/DeleteUserAccordian';
import ProfileBox from '../../components/mypage/ProfileBox';
import useAuthContext from '../../hooks/useAuthContext';
import { User } from 'firebase/auth';
import useMyRatingsQuery from '../../hooks/rating/useMyRatingsQuery';
import Rating from '../../types/Rating';
import Comment from '../../types/Comment';
import useMyCommentsQuery from '../../hooks/comment/useMyCommentsQuery';
import LoadingPage from '../../components/common/LoadingPage';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const MyPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { user } = useAuthContext();
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

  const props = {
    user,
    myRatings,
    myComments,
  };
  return <MyPageView {...props} />;
};

interface ViewProps {
  user: User;
  myRatings: Rating[];
  myComments: Comment[];
}

const MyPageView = ({ user, myRatings, myComments }: ViewProps) => {
  return (
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
  );
};

export default MyPage;
