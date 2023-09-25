import { Container, Typography } from '@mui/material';
import GoogleSignInButton from '../../components/signin/GoogleSignInButton';

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
        gap: '20px',
        height: '100%',
        paddingBottom: '20vh',
      }}
    >
      <Typography fontSize={24} fontWeight={800}>
        SIGN IN
      </Typography>
      <GoogleSignInButton />
    </Container>
  );
};

export default SignInPage;
