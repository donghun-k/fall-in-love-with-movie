import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { enqueueSnackbar } from 'notistack';

import { signIn } from '../../services/auth';

const GoogleSignInButton = () => {
  const handleSignIn = async () => {
    try {
      await signIn('google');
      enqueueSnackbar('로그인 되었습니다.', { variant: 'success' });
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
