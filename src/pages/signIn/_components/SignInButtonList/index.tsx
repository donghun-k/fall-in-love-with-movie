import { Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

import SignInButton from './SignInButton';

const SignInButtonList = () => {
  return (
    <Box
      component="ul"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="10px"
      width="100%"
      padding="0"
    >
      <SignInButton
        provider="google"
        startIcon={<GoogleIcon />}
        buttonText="GOOGLE 로그인"
      />
      <SignInButton
        provider="github"
        startIcon={<GitHubIcon />}
        buttonText="GITHUB 로그인"
      />
    </Box>
  );
};

export default SignInButtonList;
