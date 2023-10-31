import { PaletteMode } from '@mui/material';
import { grey } from '@mui/material/colors';

const getDesignTokens = (mode: PaletteMode) => ({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * {
          transition: background-color 0.5s ease;
          word-break: keep-all;
        }
        *::-webkit-scrollbar {
          width: 10px;
        }
        *::-webkit-scrollbar-thumb {
          background: #666;
          border-radius: 20px;
        }        
        *::-webkit-scrollbar-track {
          background: #ddd;
          border-radius: 20px;
        }
        body {
          overflow-x: hidden;
        }
        img {
          filter: grayscale(100%);
          transition: all .5s ease-in-out;
          :hover {
            filter: grayscale(0%);
          }
        }
      `,
    },
  },
  typography: {
    fontFamily: 'Noto Sans KR',
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: grey[800],
            light: grey[700],
            dark: grey[900],
          },
          background: {
            default: '#fff',
            paper: '#fff9fa',
            paperFocus: '#fff',
            nav: grey[100],
          },
          text: {
            primary: '#000',
            secondary: grey[600],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: grey[700],
            light: grey[600],
            dark: grey[800],
          },
          background: {
            default: '#000',
            paper: grey[900],
            paperFocus: grey[800],
            nav: '#111',
          },
          text: {
            primary: '#fff',
            secondary: grey[400],
          },
        }),
  },
});

export default getDesignTokens;
