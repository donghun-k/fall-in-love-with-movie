import { Box, Grid, Toolbar } from '@mui/material';
import { User } from 'firebase/auth';
import { useSelector } from 'react-redux';

import useMediaQueries from '../../hooks/useMediaQueries';
import SearchBar from './SearchBar';
import SignInButton from './SignInButton';
import LogoButton from './LogoButton';
import PaletteModeSwitch from './PaletteModeSwitch';
import SignOutButton from './SignOutButton';
import MyPageButton from './MyPageButton';
import SearchButton from './SearchButton';
import { RootState } from '../../store';

const NavBar = () => {
  const { isSmDown, isSmUp, isMdDown } = useMediaQueries();
  const { user, isCheckingAuth } = useSelector(
    (state: RootState) => state.auth
  );

  const props = {
    user,
    isCheckingAuth,
    isSmDown,
    isSmUp,
    isMdDown,
  };

  return <NavBarView {...props} />;
};

interface ViewProps {
  user: User | null;
  isCheckingAuth: boolean;
  isSmDown: boolean;
  isSmUp: boolean;
  isMdDown: boolean;
}

const NavBarView = ({
  user,
  isCheckingAuth,
  isSmDown,
  isSmUp,
  isMdDown,
}: ViewProps) => {
  return (
    <Box
      component="nav"
      position="sticky"
      sx={{
        top: '0px',
        display: 'flex',
        width: '100vw',
        height: '80px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'background.nav',
        zIndex: 100,
      }}
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
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              {isSmUp && (isMdDown ? <SearchButton /> : <SearchBar />)}
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
