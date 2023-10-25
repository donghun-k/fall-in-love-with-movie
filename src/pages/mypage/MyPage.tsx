import { Box } from '@mui/material';
import RatingChartAccordian from '../../components/mypage/RatingChartAccordian';
import RatedMovieAccordian from '../../components/mypage/RatedMovieAccordian';
import CommentAccordian from '../../components/mypage/CommentAccordian';
import PreferredGenreAccordian from '../../components/mypage/PreferredGenreAccordian';
import DeleteAccountAccordian from '../../components/mypage/DeleteAccountAccordian';
import ProfileBox from '../../components/mypage/ProfileBox';
import useAuthContext from '../../hooks/useAuthContext';
import { User } from 'firebase/auth';
import useMyRatings from '../../hooks/rating/useMyRatings';
import Rating from '../../types/Rating';
import Comment from '../../types/Comment';
import useMyCommentsQuery from '../../hooks/comment/useMyCommentsQuery';

const MyPage = () => {
  const { user } = useAuthContext();
  const { data: ratings } = useMyRatings({
    userId: user?.uid || '',
  });
  const { data: comments } = useMyCommentsQuery({
    userId: user?.uid || '',
  });

  const props = { user, ratings, comments };
  return <MyPageView {...props} />;
};

interface ViewProps {
  user: User | null;
  ratings: Rating[] | undefined;
  comments: Comment[] | undefined;
}

const MyPageView = ({ user, ratings, comments }: ViewProps) => {
  if (!user) return null;
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
        {ratings && <RatingChartAccordian ratings={ratings} />}
        {ratings && <PreferredGenreAccordian ratings={ratings} />}
        {ratings && <RatedMovieAccordian ratings={ratings} />}
        {comments && <CommentAccordian myComments={comments} />}
        <DeleteAccountAccordian />
      </Box>
    </Box>
  );
};

export default MyPage;
