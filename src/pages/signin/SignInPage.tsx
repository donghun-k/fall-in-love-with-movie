import { Container } from '@mui/material';
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
        height: '100vh',
        paddingBottom: '20vh',
      }}
    >
      <GoogleSignInButton />
    </Container>
  );
};

export default SignInPage;
