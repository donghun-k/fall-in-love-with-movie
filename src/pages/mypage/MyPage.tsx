import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
} from '@mui/material';
import RatingChartAccordian from '../../components/mypage/RatingChartAccordian';
import RatedMovieAccordian from '../../components/mypage/RatedMovieAccordian';
import CommentAccordian from '../../components/mypage/CommentAccordian';
import PreferredGenreAccordian from '../../components/mypage/PreferredGenreAccordian';
import DeleteAccountAccordian from '../../components/mypage/DeleteAccountAccordian';
import ProfileBox from '../../components/mypage/ProfileBox';

interface Props {}

const MyPage = ({}: Props) => {
  const props = {};
  return <MyPageView {...props} />;
};

interface ViewProps {}

const MyPageView = ({}: ViewProps) => {
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
        <ProfileBox />
        <RatingChartAccordian />
        <PreferredGenreAccordian />
        <RatedMovieAccordian />
        <CommentAccordian />
        <DeleteAccountAccordian />
      </Box>
    </Box>
  );
};

export default MyPage;
