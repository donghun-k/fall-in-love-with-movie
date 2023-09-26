import { Button } from '@mui/material';
import useAuthContext from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../api/auth';
import GitHubIcon from '@mui/icons-material/GitHub';

const GitHubSignInButton = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      const user = await signIn('github');
      setUser(user);
      navigate('/', { replace: true });
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
      Sign In with GITHUB
    </Button>
  );
};

export default GitHubSignInButton;