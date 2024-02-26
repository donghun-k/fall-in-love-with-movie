import { Box, CircularProgress } from '@mui/material';

const LoadingPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingPage;
