import { Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { signOut } from '../../../services/auth';

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignOut = async () => {
    try {
      await signOut();
      queryClient.removeQueries({
        queryKey: ['myComment'],
      });
      queryClient.removeQueries({
        queryKey: ['myRating'],
      });
      queryClient.removeQueries({
        queryKey: ['myRatings'],
      });
      queryClient.removeQueries({
        queryKey: ['myComments'],
      });
      queryClient.invalidateQueries({
        queryKey: ['comments'],
      });

      enqueueSnackbar('로그아웃 되었습니다.', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('로그아웃에 실패하였습니다.', { variant: 'error' });
    }
  };

  return (
    <Button sx={{ height: '50px' }} onClick={handleSignOut} variant="text">
      <LogoutIcon fontSize="large" />
      <Typography
        variant="subtitle2"
        pt={0.5}
        ml={0.5}
        fontWeight={600}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        로그아웃
      </Typography>
    </Button>
  );
};

export default SignOutButton;
