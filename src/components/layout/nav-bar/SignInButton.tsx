import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

const SignInButton = () => {
  return (
    <Link to="/auth">
      <Button
        variant="text"
        sx={{
          color: 'text.button',
          '&:hover': {
            color: 'text.buttonHover',
          },
        }}
      >
        <Typography
          variant="subtitle2"
          pt={2}
          mr={0.5}
          fontWeight={600}
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          Sign In
        </Typography>
        <LoginIcon fontSize="large" />
      </Button>
    </Link>
  );
};

export default SignInButton;
