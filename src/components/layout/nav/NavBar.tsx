import { AppBar, Box, Grid, Toolbar } from '@mui/material';
import useMediaQueries from '../../../hooks/useMediaQueries';
import SearchBar from './SearchBar';
import SignInButton from './SignInButton';
import LogoButton from './LogoButton';

const NavBar = () => {
  const { isMobile, isTablet } = useMediaQueries();

  const props = {
    isMobile,
    isTablet,
  };

  return <NavBarView {...props} />;
};

interface ViewProps {
  isMobile: boolean;
  isTablet: boolean;
}

const NavBarView = ({ isMobile, isTablet }: ViewProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        display: 'flex',
        height: '80px',
        justifyContent: 'center',
        backgroundColor: 'background.nav',
      }}
      // enableColorOnDark
    >
      <Grid container>
        <Grid item xs={0} md={1} lg={2} />
        <Grid item xs={12} md={10} lg={8}>
          <Toolbar
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: isMobile ? 'center' : 'space-between',
            }}
          >
            <LogoButton />
            {isMobile ? (
              <></>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <SearchBar />
                <SignInButton isTablet={isTablet} />
              </Box>
            )}
          </Toolbar>
        </Grid>
        <Grid item xs={0} md={1} lg={2} />
      </Grid>
    </AppBar>
  );
};

export default NavBar;
