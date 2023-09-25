import { AppBar, Box, Grid, Toolbar } from '@mui/material';
import useMediaQueries from '../../../hooks/useMediaQueries';
import SearchBar from './SearchBar';
import SignInButton from './SignInButton';
import LogoButton from './LogoButton';
import ToggleModeButton from './ToggleModeButton';
import useAuthContext from '../../../hooks/useAuthContext';
import { User } from 'firebase/auth';
import SignOutButton from './SignOutButton';

interface Props {
  onToggleModeBtnClick: () => void;
}

const NavBar = ({ onToggleModeBtnClick }: Props) => {
  const { isMobile, isTablet } = useMediaQueries();
  const { user } = useAuthContext();

  const props = {
    user,
    isMobile,
    isTablet,
    onToggleModeBtnClick,
  };

  return <NavBarView {...props} />;
};

interface ViewProps {
  user: User | null;
  isMobile: boolean;
  isTablet: boolean;
  onToggleModeBtnClick: () => void;
}

const NavBarView = ({ user, isMobile, onToggleModeBtnClick }: ViewProps) => {
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
              }}
            >
              {!isMobile && (
                <>
                  <SearchBar />
                  {user === null ? <SignInButton /> : <SignOutButton />}
                </>
              )}
              <ToggleModeButton onClick={onToggleModeBtnClick} />
            </Box>
          </Toolbar>
        </Grid>
        <Grid item xs={0} md={1} lg={2} />
      </Grid>
    </AppBar>
  );
};

export default NavBar;
