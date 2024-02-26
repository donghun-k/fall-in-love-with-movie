import { Box, Divider, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import GoogleSignInButton from './_components/GoogleSignInButton';
import GitHubSignInButton from './_components/GitHubSignInButton';

const SignInPage = () => {
  return (
    <>
      <Helmet>
        <title>로그인 - FILM</title>
      </Helmet>
      <Box
        component="main"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        paddingBottom="20vh"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="300px"
          height="100%"
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
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="10px"
            width="100%"
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
