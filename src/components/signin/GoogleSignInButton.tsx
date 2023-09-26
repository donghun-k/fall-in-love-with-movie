import { Button } from '@mui/material';
import useAuthContext from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../api/auth';
import GoogleIcon from '@mui/icons-material/Google';

const GoogleSignInButton = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      const user = await signIn('google');
      setUser(user);
      navigate('/', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const props = {
    onSignInBtnClick: handleSignIn,
  };
  return <GoogleSignInButtonView {...props} />;
};

interface ViewProps {
  onSignInBtnClick: () => void;
}

const GoogleSignInButtonView = ({ onSignInBtnClick }: ViewProps) => {
  return (
    <Button
      onClick={onSignInBtnClick}
      variant="outlined"
      size="large"
      startIcon={<GoogleIcon />}
      fullWidth
      sx={{
        color: 'text.primary',
        borderColor: 'text.primary',
        '&:hover': {
          color: 'text.secondary',
          borderColor: 'text.secondary',
          backgroundColor: 'transparent',
        },
      }}
    >
      Sign In with Google
    </Button>
  );
};

export default GoogleSignInButton;
