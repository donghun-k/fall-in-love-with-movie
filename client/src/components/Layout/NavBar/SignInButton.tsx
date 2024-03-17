import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

const SignInButton = () => {
  return (
    <Link to="/signin">
      <Button
        sx={{
          height: '50px',
        }}
        variant="text"
      >
        <Typography
          variant="subtitle2"
          display={{ xs: 'none', md: 'block' }}
          pt={0.5}
          mr={0.5}
          fontWeight={600}
        >
          로그인
        </Typography>
        <LoginIcon fontSize="large" />
      </Button>
    </Link>
  );
};

export default SignInButton;
