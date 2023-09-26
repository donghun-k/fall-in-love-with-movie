import { Box, Container, Typography } from '@mui/material';
import GoogleSignInButton from '../../components/signin/GoogleSignInButton';
import GitHubSignInButton from '../../components/signin/GithubSignInButton';

const SignInPage = () => {
  const props = {};
  return <SignInPageView {...props} />;
};

// interface Props {}

const SignInPageView = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '30px',
        height: '100%',
        paddingBottom: '20vh',
      }}
    >
      <Typography fontSize={40} fontWeight={800}>
        SIGN IN
      </Typography>
      <Box
        sx={{
          width: '300px',
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
    </Container>
  );
};

export default SignInPage;
