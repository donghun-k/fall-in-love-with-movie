import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../api/auth';
import GitHubIcon from '@mui/icons-material/GitHub';

const GitHubSignInButton = () => {
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      await signIn('github');
      navigate(-1);
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
