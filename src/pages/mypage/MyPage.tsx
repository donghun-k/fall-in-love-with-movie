import { Box } from '@mui/material';
import RatingChartAccordian from '../../components/mypage/RatingChartAccordian';
import RatedMovieAccordian from '../../components/mypage/RatedMovieAccordian';
import CommentAccordian from '../../components/mypage/CommentAccordian';
import PreferredGenreAccordian from '../../components/mypage/PreferredGenreAccordian';
import DeleteAccountAccordian from '../../components/mypage/DeleteAccountAccordian';
import ProfileBox from '../../components/mypage/ProfileBox';
import useAuthContext from '../../hooks/useAuthContext';
import { User } from 'firebase/auth';

const MyPage = () => {
  const { user } = useAuthContext();
  const props = { user };
  return <MyPageView {...props} />;
};

interface ViewProps {
  user: User | null;
}

const MyPageView = ({ user }: ViewProps) => {
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
        <RatingChartAccordian userId={user.uid} />
        <PreferredGenreAccordian />
        <RatedMovieAccordian />
        <CommentAccordian />
        <DeleteAccountAccordian />
      </Box>
    </Box>
  );
};

export default MyPage;
