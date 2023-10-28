import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../api/auth';
import GoogleIcon from '@mui/icons-material/Google';

const GoogleSignInButton = () => {
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      await signIn('google');
      navigate(-1);
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
      Google 로그인
    </Button>
  );
};

export default GoogleSignInButton;
