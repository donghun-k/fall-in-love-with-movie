import { Box, Grid, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';

import useMediaQueries from '../../../hooks/useMediaQueries';
import SearchBar from './SearchBar';
import SignInButton from './SignInButton';
import LogoButton from './LogoButton';
import PaletteModeSwitch from './PaletteModeSwitch';
import SignOutButton from './SignOutButton';
import MyPageButton from './MyPageButton';
import SearchButton from './SearchButton';
import { RootState } from '../../../store';

const NavBar = () => {
  const { isSmDown, isSmUp, isMdDown } = useMediaQueries();
  const { user, isCheckingAuth } = useSelector(
    (state: RootState) => state.auth,
  );

  return (
    <Box
      component="nav"
      position="sticky"
      top="0px"
      display="flex"
      width="100vw"
      height="80px"
      justifyContent="center"
      alignItems="center"
      zIndex="100"
      bgcolor="custom.nav"
    >
      <Grid container>
        <Grid item xs={0} md={1} lg={2} />
        <Grid item xs={12} md={10} lg={8}>
          <Toolbar
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <LogoButton />
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap="10px"
            >
              {isSmUp && isMdDown && <SearchButton />}
              {isSmUp && !isMdDown && <SearchBar />}
              {!isCheckingAuth && !isSmDown && (
                <>
                  {user && <MyPageButton />}
                  {user === null ? <SignInButton /> : <SignOutButton />}
                </>
              )}
              <PaletteModeSwitch />
            </Box>
          </Toolbar>
        </Grid>
        <Grid item xs={0} md={1} lg={2} />
      </Grid>
    </Box>
  );
};

export default NavBar;
