import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';
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
import getDesignTokens from './theme';
import TabBar from './components/layout/tab-bar/TabBar';

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
        <NavBar onToggleModeBtnClick={toggleMode} />
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
          </Grid>
          <Grid item xs={0} md={1} lg={2} />
        </Grid>
        <TabBar />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
