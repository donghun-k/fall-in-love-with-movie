import { Box } from '@mui/material';
import RatingChartAccordian from '../../components/mypage/RatingChartAccordian';
import RatedMovieAccordian from '../../components/mypage/RatedMovieAccordian';
import CommentAccordian from '../../components/mypage/CommentAccordian';
import PreferredGenreAccordian from '../../components/mypage/PreferredGenreAccordian';
import DeleteUserAccordian from '../../components/mypage/DeleteUserAccordian';
import ProfileBox from '../../components/mypage/ProfileBox';
import useAuthContext from '../../hooks/useAuthContext';
import { User } from 'firebase/auth';
import useMyRatings from '../../hooks/rating/useMyRatings';
import Rating from '../../types/Rating';
import Comment from '../../types/Comment';
import useMyCommentsQuery from '../../hooks/comment/useMyCommentsQuery';
import LoadingPage from '../../components/common/LoadingPage';
import { Navigate } from 'react-router-dom';

const MyPage = () => {
  const { user, isCheckingAuth } = useAuthContext();
  const { data: myRatings, isLoading: isMyRatingsLoading } = useMyRatings({
    userId: user?.uid || '',
  });
  const { data: myComments, isLoading: isMyCommentsLoading } =
    useMyCommentsQuery({
      userId: user?.uid || '',
    });

  if (isCheckingAuth) return <LoadingPage />;

  if (!user) {
    alert('로그인 후 이용해주세요.');
    return <Navigate to="/signin" replace />;
  }

  if (isMyRatingsLoading || isMyCommentsLoading) return <LoadingPage />;

  if (!myRatings || !myComments) {
    alert('데이터를 불러오는데 실패했습니다. 다시 시도해주세요.');
    return <Navigate to="-1" replace />;
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
