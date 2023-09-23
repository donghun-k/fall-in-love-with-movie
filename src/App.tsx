import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';
import { Outlet } from 'react-router-dom';
import { CssBaseline, Grid, ThemeProvider } from '@mui/material';
import theme from './theme';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid
          container
          sx={{
            background: '#000000',
            width: '100vw',
            height: '100vh',
          }}
        >
          <Grid item xs={0} md={1} lg={2} />
          <Grid item xs={12} md={10} lg={8}>
            <Outlet />
          </Grid>
          <Grid item xs={0} md={1} lg={2} />
        </Grid>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
