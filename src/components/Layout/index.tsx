import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import BottomNavBar from './BottomNavBar';
import NavBar from './NavBar';
import MuiContextProvider from '../../contexts/MuiContext';
import LoadingPage from '../ui/LoadingPage';
import DialogContainer from './DialogContainer';

const Layout = () => {
  return (
    <MuiContextProvider>
      <NavBar />
      <Grid
        container
        width="100vw"
        minHeight={{
          xs: 'calc(100vh - 160px)',
          sm: 'calc(100vh - 80px)',
        }}
        sx={{
          background: 'background.default',
        }}
      >
        <Grid item xs={0} md={1} lg={2} />
        <Grid item xs={12} md={10} lg={8} position="relative">
          <Suspense fallback={<LoadingPage />}>
            <Outlet />
          </Suspense>
        </Grid>
        <Grid item xs={0} md={1} lg={2} />
      </Grid>
      <BottomNavBar />
      <DialogContainer />
    </MuiContextProvider>
  );
};

export default Layout;
