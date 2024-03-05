import { ReactElement } from 'react';
import { Button } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

import { AuthType, signIn } from '../../../../services/auth';

interface Props {
  provider: AuthType;
  startIcon: ReactElement;
  buttonText: string;
}

const SocialSignInButton = ({ provider, startIcon, buttonText }: Props) => {
  const handleSignIn = async () => {
    try {
      await signIn(provider);
      enqueueSnackbar('로그인 되었습니다.', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      variant="outlined"
      size="large"
      startIcon={startIcon}
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
      {buttonText}
    </Button>
  );
};

export default SocialSignInButton;
