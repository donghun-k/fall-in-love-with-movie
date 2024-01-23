import { Button, PaletteMode } from '@mui/material';
import { Link } from 'react-router-dom';
import LOGO_IMAGES from '../../../utils/logo';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

const LogoButton = () => {
  const { paletteMode } = useSelector((state: RootState) => state.paletteMode);

  const props = {
    paletteMode,
  };

  return <LogoButtonView {...props} />;
};

interface ViewProps {
  paletteMode: PaletteMode;
}

const LogoButtonView = ({ paletteMode }: ViewProps) => {
  return (
    <Link to="/">
      <Button
        sx={{
          width: { xs: '128px', sm: '144px' },
          height: { xs: '48px', sm: '54px' },
          padding: '0',
        }}
      >
        <img
          src={LOGO_IMAGES[paletteMode].logo}
          alt="logo"
          width="100%"
          height="100%"
        />
      </Button>
    </Link>
  );
};

export default LogoButton;
