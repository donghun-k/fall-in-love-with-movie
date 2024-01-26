import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { enqueueSnackbar } from 'notistack';

import { signIn } from '../../services/auth';

const GitHubSignInButton = () => {
  const handleSignIn = async () => {
    try {
      await signIn('github');
      enqueueSnackbar('로그인 되었습니다.', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  const props = {
    onSignInBtnClick: handleSignIn,
  };
  return <GitHubSignInButtonView {...props} />;
};

interface ViewProps {
  onSignInBtnClick: () => void;
}

const GitHubSignInButtonView = ({ onSignInBtnClick }: ViewProps) => {
  return (
    <Button
      onClick={onSignInBtnClick}
      variant="outlined"
      size="large"
      startIcon={<GitHubIcon />}
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
      GITHUB 로그인
    </Button>
  );
};

export default GitHubSignInButton;
