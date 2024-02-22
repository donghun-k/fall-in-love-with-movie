import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LOGO_IMAGES from '../../../utils/logo';
import { RootState } from '../../../store';

const LogoButton = () => {
  const { paletteMode } = useSelector((state: RootState) => state.paletteMode);

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
          src={LOGO_IMAGES[paletteMode].logo} // LOGO_IMAGES는 해당 로고 이미지들이 정의된 객체입니다.
          alt="logo"
          width="100%"
          height="100%"
        />
      </Button>
    </Link>
  );
};

export default LogoButton;
