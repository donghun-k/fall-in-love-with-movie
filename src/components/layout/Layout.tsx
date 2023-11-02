import {
  CssBaseline,
  Grid,
  PaletteMode,
  Theme,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import getDesignTokens from '../../configs/theme';
import BottomNavBar from './bottom-nav/BottomNavBar';
import SearchDialog from './common/SearchDialog';
import NavBar from './nav/NavBar';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const [mode, setMode] = useState<PaletteMode>('dark');
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const togglePaletteMode = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const [openSearchBox, setOpenSearchBox] = useState(false);
  const handleSearchDialogOpen = () => {
    setOpenSearchBox(true);
  };
  const handleSearchDialogClose = () => {
    setOpenSearchBox(false);
  };
  const props = {
    children,
    theme,
    togglePaletteMode,
    handleSearchDialogOpen,
    handleSearchDialogClose,
    openSearchBox,
  };
  return <LayoutView {...props} />;
};

interface ViewProps {
  children: ReactNode;
  theme: Theme;
  togglePaletteMode: () => void;
  handleSearchDialogOpen: () => void;
  handleSearchDialogClose: () => void;
  openSearchBox: boolean;
}

const LayoutView = ({
  children,
  theme,
  togglePaletteMode,
  handleSearchDialogOpen,
  handleSearchDialogClose,
  openSearchBox,
}: ViewProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        autoHideDuration={3000}
        style={{
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <NavBar
          togglePaletteMode={togglePaletteMode}
          handleSearchDialogOpen={handleSearchDialogOpen}
        />
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
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default Layout;
