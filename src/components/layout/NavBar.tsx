import { AppBar, Box, Button, Grid, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import useMediaQueries from '../../hooks/useMediaQueries';
import SearchBar from './SearchBar';
import SignInButton from './SignInButton';

const NavBar = () => {
  const { isMobile, isTablet, isDesktop } = useMediaQueries();

  const props = {
    isMobile,
    isTablet,
    isDesktop,
  };

  return <NavBarView {...props} />;
};

interface ViewProps {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const NavBarView = ({ isMobile, isTablet, isDesktop }: ViewProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        display: 'flex',
        height: '80px',
        justifyContent: 'center',
        backgroundColor: '#111',
        boxShadow: '0 3px 3px #111',
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
            <Link to="/">
              <Button
                sx={{
                  width: { xs: '146px', sm: '160px' },
                  height: { xs: '54px', sm: '60px' },
                  padding: '0',
                }}
              >
                <img
                  src="/src/assets/logo1.png"
                  alt="logo"
                  width="100%"
                  height="100%"
                />
              </Button>
            </Link>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <SearchBar />
              <SignInButton isTablet={isTablet} />
            </Box>
          </Toolbar>
        </Grid>
        <Grid item xs={0} md={1} lg={2} />
      </Grid>
    </AppBar>
  );
};

export default NavBar;
