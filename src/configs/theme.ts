import { PaletteMode } from '@mui/material';
import { grey } from '@mui/material/colors';

const getDesignTokens = (mode: PaletteMode) => ({
  typography: {
    fontFamily: 'Noto Sans KR',
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#ff8cac',
            light: '#ffbfd1',
            dark: '#ff5987',
          },
          background: {
            default: '#fff',
            paper: '#fff9fa',
            paperFocus: '#fff',
            nav: '#fff9fb',
          },
          text: {
            primary: '#000',
            secondary: grey[600],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#ff8cac',
            light: '#ffbfd1',
            dark: '#ff5987',
          },
          background: {
            default: '#000',
            paper: grey[900],
            paperFocus: grey[800],
            nav: '#000',
          },
          text: {
            primary: '#fff',
            secondary: grey[400],
          },
        }),
  },
});

export default getDesignTokens;
