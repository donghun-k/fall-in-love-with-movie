import { useTheme } from '@mui/material';

const usePalletteMode = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  return mode;
};

export default usePalletteMode;
