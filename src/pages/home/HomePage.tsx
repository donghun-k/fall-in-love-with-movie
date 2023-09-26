import { Box } from '@mui/material';
import TitleSection from '../../components/home/TitleSection';

const HomePage = () => {
  return <HomePageView />;
};

const HomePageView = () => {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TitleSection />
    </Box>
  );
};

export default HomePage;
