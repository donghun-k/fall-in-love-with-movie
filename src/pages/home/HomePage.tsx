import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import TitleSection from '../../components/home/TitleSection';

const HomePage = () => {
  return <HomePageView />;
};

const HomePageView = () => {
  return (
    <>
      <Helmet>
        <title>FILM - Fall In Love with Movie</title>
      </Helmet>
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
    </>
  );
};

export default HomePage;
