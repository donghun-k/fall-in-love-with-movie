import { AppBar, Box, Grid, Toolbar } from '@mui/material';
import useMediaQueries from '../../../hooks/useMediaQueries';
import SearchBar from './SearchBar';
import SignInButton from './SignInButton';
import LogoButton from './LogoButton';
import PaletteModeSwitch from './PaletteModeSwitch';
import useAuthContext from '../../../hooks/useAuthContext';
import { User } from 'firebase/auth';
import SignOutButton from './SignOutButton';

interface Props {
  togglePaletteMode: () => void;
}

const NavBar = ({ togglePaletteMode }: Props) => {
  const { isMobile, isTablet } = useMediaQueries();
  const { user } = useAuthContext();

  const props = {
    user,
    isMobile,
    isTablet,
    togglePaletteMode,
  };

  return <NavBarView {...props} />;
};

interface ViewProps {
  user: User | null;
  isMobile: boolean;
  isTablet: boolean;
  togglePaletteMode: () => void;
}

const NavBarView = ({ user, isMobile, togglePaletteMode }: ViewProps) => {
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
              {!isMobile && (
                <>
                  <SearchBar />
                  {user === null ? <SignInButton /> : <SignOutButton />}
                </>
              )}
              <PaletteModeSwitch togglePaletteMode={togglePaletteMode} />
            </Box>
          </Toolbar>
        </Grid>
        <Grid item xs={0} md={1} lg={2} />
      </Grid>
    </AppBar>
  );
};

export default NavBar;
