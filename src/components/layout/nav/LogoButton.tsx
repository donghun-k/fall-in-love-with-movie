import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const LogoButton = () => {
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
          src="/src/assets/logo1.png"
          alt="logo"
          width="100%"
          height="100%"
        />
      </Button>
    </Link>
  );
};

export default LogoButton;
