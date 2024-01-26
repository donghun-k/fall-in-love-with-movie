import { Box, Divider, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import GoogleSignInButton from '../../components/signin/GoogleSignInButton';
import GitHubSignInButton from '../../components/signin/GitHubSignInButton';

const SignInPage = () => {
  return (
    <>
      <Helmet>
        <title>로그인 - FILM</title>
      </Helmet>
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
            로그인
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
    </>
  );
};

export default SignInPage;
