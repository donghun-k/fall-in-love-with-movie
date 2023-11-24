import { Grid } from '@mui/material';
import { ReactNode, useState } from 'react';
import BottomNavBar from './components/layout/bottom-nav/BottomNavBar';
import SearchDialog from './components/layout/SearchDialog';
import NavBar from './components/layout/nav/NavBar';
import MuiContextProvider from './contexts/MuiContext';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const handleSearchDialogOpen = () => {
    setOpenSearchBox(true);
  };
  const handleSearchDialogClose = () => {
    setOpenSearchBox(false);
  };
  const props = {
    children,
    handleSearchDialogOpen,
    handleSearchDialogClose,
    openSearchBox,
  };
  return <LayoutView {...props} />;
};

interface ViewProps {
  children: ReactNode;
  handleSearchDialogOpen: () => void;
  handleSearchDialogClose: () => void;
  openSearchBox: boolean;
}

const LayoutView = ({
  children,
  handleSearchDialogOpen,
  handleSearchDialogClose,
  openSearchBox,
}: ViewProps) => {
  return (
    <MuiContextProvider>
      <NavBar handleSearchDialogOpen={handleSearchDialogOpen} />
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
      <BottomNavBar handleSearchDialogOpen={handleSearchDialogOpen} />
      <SearchDialog
        open={openSearchBox}
        handleSearchDialogClose={handleSearchDialogClose}
      />
    </MuiContextProvider>
  );
};

export default Layout;
