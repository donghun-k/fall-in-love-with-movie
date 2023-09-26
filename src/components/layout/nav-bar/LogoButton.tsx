import { Button, PaletteMode } from '@mui/material';
import { Link } from 'react-router-dom';
import LOGO_IMAGES from '../../../utils/logo';
import usePalletteMode from '../../../hooks/usePaletteMode';

const LogoButton = () => {
  const mode = usePalletteMode();

  const props = {
    mode,
  };

  return <LogoButtonView {...props} />;
};

interface ViewProps {
  mode: PaletteMode;
}

const LogoButtonView = ({ mode }: ViewProps) => {
  return (
    <Link to="/">
      <Button
        sx={{
          width: { xs: '146px', sm: '160px' },
          height: { xs: '54px', sm: '60px' },
          padding: '0',
        }}
      >
        <img
          src={LOGO_IMAGES[mode].logo}
          alt="logo"
          width="100%"
          height="100%"
        />
      </Button>
    </Link>
  );
};

export default LogoButton;
