import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';
import { Outlet } from 'react-router-dom';
import {
  CssBaseline,
  Grid,
  IconButton,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import NavBar from './components/layout/nav/NavBar';
import { useCallback, useMemo, useState } from 'react';
import getDesignTokens from './theme';

function App() {
  const [mode, setMode] = useState<PaletteMode>('light');
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const toggleMode = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Grid
          container
          sx={{
            paddingTop: '80px',
            background: 'background.default',
            width: '100vw',
            height: '100vh',
          }}
        >
          <Grid item xs={0} md={1} lg={2} />
          <Grid item xs={12} md={10} lg={8} position="relative">
            <Outlet />
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 20,
                right: 0,
                boxShadow: 2,
              }}
              onClick={toggleMode}
            >
              {theme.palette.mode === 'dark' ? (
                <Brightness7Icon fontSize="large" />
              ) : (
                <Brightness4Icon fontSize="large" />
              )}
            </IconButton>
          </Grid>
          <Grid item xs={0} md={1} lg={2} />
        </Grid>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
