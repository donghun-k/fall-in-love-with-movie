import { useMediaQuery, useTheme } from '@mui/material';

const useMediaQueries = () => {
  const theme = useTheme();
  const isXsUp = useMediaQuery(theme.breakpoints.up('xs'));
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const isXlUp = useMediaQuery(theme.breakpoints.up('xl'));
  const isXlDown = useMediaQuery(theme.breakpoints.down('xl'));

  return {
    isXsUp,
    isXsDown,
    isSmUp,
    isSmDown,
    isMdUp,
    isMdDown,
    isLgUp,
    isLgDown,
    isXlUp,
    isXlDown,
  };
};

export default useMediaQueries;
