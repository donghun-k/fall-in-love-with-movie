import { Grid } from '@mui/material';
import { ReactNode } from 'react';
import BottomNavBar from './components/layout/bottom-nav/BottomNavBar';
import SearchDialog from './components/layout/SearchDialog';
import NavBar from './components/layout/nav/NavBar';
import MuiContextProvider from './contexts/MuiContext';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const props = {
    children,
  };
  return <LayoutView {...props} />;
};

interface ViewProps {
  children: ReactNode;
}

const LayoutView = ({ children }: ViewProps) => {
  return (
    <MuiContextProvider>
      <NavBar />
      <Grid
        container
        sx={{
          background: 'background.default',
          width: '100vw',
          minHeight: {
            xs: 'calc(100vh - 160px)',
            sm: 'calc(100vh - 80px)',
          },
        }}
      >
        <Grid item xs={0} md={1} lg={2} />

        <Grid item xs={12} md={10} lg={8} position="relative">
          {children}
        </Grid>

        <Grid item xs={0} md={1} lg={2} />
      </Grid>
      <BottomNavBar />
      <SearchDialog />
    </MuiContextProvider>
  );
};

export default Layout;
