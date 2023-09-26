import { Box, Divider, Typography } from '@mui/material';
import GoogleSignInButton from '../../components/signin/GoogleSignInButton';
import GitHubSignInButton from '../../components/signin/GithubSignInButton';

const SignInPage = () => {
  const props = {};
  return <SignInPageView {...props} />;
};

// interface Props {}

const SignInPageView = () => {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingBottom: '20vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '300px',
          height: '100%',
        }}
      >
        <Typography color="primary.main" fontSize={40} fontWeight={800}>
          SIGN IN
        </Typography>
        <Divider
          sx={{
            width: '100%',
            marginBottom: '30px',
          }}
        />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <GoogleSignInButton />
          <GitHubSignInButton />
        </Box>
      </Box>
    </Box>
  );
};

export default SignInPage;
