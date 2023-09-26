import { PaletteMode } from '@mui/material';
import logoLight from '../assets/logos/logo-light-mode.png';
import logoDark from '../assets/logos/logo-dark-mode.png';
import logoColLight from '../assets/logos/logo-col-light-mode.png';
import logoColDark from '../assets/logos/logo-col-dark-mode.png';
import logoIconLight from '../assets/logos/logo-icon-light-mode.png';
import logoIconDark from '../assets/logos/logo-icon-dark-mode.png';

interface Icons {
  logo: string;
  logoCol: string;
  logoIcon: string;
}

const LOGO_IMAGES: Record<PaletteMode, Icons> = {
  light: {
    logo: logoLight,
    logoCol: logoColLight,
    logoIcon: logoIconLight,
  },
  dark: {
    logo: logoDark,
    logoCol: logoColDark,
    logoIcon: logoIconDark,
  },
};

export default LOGO_IMAGES;
