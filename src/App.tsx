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
import NavBar from './components/layout/nav-bar/NavBar';
import { useCallback, useMemo, useState } from 'react';
import getDesignTokens from './configs/theme';
import TabBar from './components/layout/tab-bar/TabBar';
import { AuthContextProvider } from './contexts/AuthContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  const [mode, setMode] = useState<PaletteMode>('dark');
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const togglePaletteMode = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavBar togglePaletteMode={togglePaletteMode} />
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
          <TabBar />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
