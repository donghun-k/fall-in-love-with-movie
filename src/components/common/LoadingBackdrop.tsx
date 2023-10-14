import { Backdrop, CircularProgress } from '@mui/material';

const LoadingBackdrop = () => {
  return (
    <Backdrop open={true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CircularProgress />
    </Backdrop>
  );
};

export default LoadingBackdrop;
