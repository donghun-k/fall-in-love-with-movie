import { Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from '../../../api/auth';

const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      await signOut();
      alert('Sign out successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  const props = {
    onSignOutBtnClick: handleSignOut,
  };

  return <SignOutButtonView {...props} />;
};

interface ViewProps {
  onSignOutBtnClick: () => void;
}

const SignOutButtonView = ({ onSignOutBtnClick }: ViewProps) => {
  return (
    <Button
      sx={{
        height: '50px',
      }}
      onClick={onSignOutBtnClick}
      variant="text"
    >
      <LogoutIcon fontSize="large" />
      <Typography
        variant="subtitle2"
        pt={0.5}
        ml={0.5}
        fontWeight={600}
        sx={{
          display: { xs: 'none', md: 'block' },
        }}
      >
        Sign Out
      </Typography>
    </Button>
  );
};

export default SignOutButton;
