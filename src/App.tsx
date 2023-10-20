import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './configs/queryClient';
import { Outlet } from 'react-router-dom';
import {
  CssBaseline,
  Grid,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import NavBar from './components/layout/nav/NavBar';
import BottomNavBar from './components/layout/bottom-nav/BottomNavBar';
import { useCallback, useMemo, useState } from 'react';
import getDesignTokens from './configs/theme';
import { AuthContextProvider } from './contexts/AuthContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SearchDialog from './components/layout/SearchDialog';

function App() {
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
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
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
              <Outlet />
            </Grid>
            <Grid item xs={0} md={1} lg={2} />
          </Grid>
          <BottomNavBar handleSearchDialogOpen={handleSearchDialogOpen} />
          <SearchDialog
            open={openSearchBox}
            handleSearchDialogClose={handleSearchDialogClose}
          />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
