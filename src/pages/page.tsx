import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import TitleSection from './_components/TitleSection';

const HomePage = () => {
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
