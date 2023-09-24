import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

interface Props {
  isTablet: boolean;
}

const SignInButton = ({ isTablet }: Props) => {
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
        {!isTablet && (
          <Typography variant="subtitle2" pt={2} mr={0.5} fontWeight={600}>
            Sign In
          </Typography>
        )}
        <LoginIcon fontSize="large" />
      </Button>
    </Link>
  );
};

export default SignInButton;
