import { Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from '../../services/auth';
import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const handleSignOut = async () => {
    try {
      await signOut();
      queryClient.removeQueries(['myComment']);
      queryClient.removeQueries(['myRating']);
      queryClient.removeQueries(['myRatings']);
      queryClient.removeQueries(['myComments']);
      queryClient.invalidateQueries(['comments']);

      enqueueSnackbar('로그아웃 되었습니다.', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('로그아웃에 실패하였습니다.', {
        variant: 'error',
      });
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
        로그아웃
      </Typography>
    </Button>
  );
};

export default SignOutButton;
