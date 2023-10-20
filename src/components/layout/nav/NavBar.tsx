import { Box, Grid, Toolbar } from '@mui/material';
import useMediaQueries from '../../../hooks/useMediaQueries';
import SearchBar from './SearchBar';
import SignInButton from './SignInButton';
import LogoButton from './LogoButton';
import PaletteModeSwitch from './PaletteModeSwitch';
import useAuthContext from '../../../hooks/useAuthContext';
import { User } from 'firebase/auth';
import SignOutButton from './SignOutButton';
import MyPageButton from './MyPageButton';
import SearchButton from './SearchButton';

interface Props {
  togglePaletteMode: () => void;
  handleSearchDialogOpen: () => void;
}

const NavBar = ({ togglePaletteMode, handleSearchDialogOpen }: Props) => {
  const { isSmDown, isSmUp, isMdDown } = useMediaQueries();
  const { user } = useAuthContext();

  const props = {
    user,
    isSmDown,
    isSmUp,
    isMdDown,
    togglePaletteMode,
    handleSearchDialogOpen,
  };

  return <NavBarView {...props} />;
};

interface ViewProps {
  user: User | null;
  isSmDown: boolean;
  isSmUp: boolean;
  isMdDown: boolean;
  togglePaletteMode: () => void;
  handleSearchDialogOpen: () => void;
}

const NavBarView = ({
  user,
  isSmDown,
  isSmUp,
  isMdDown,
  togglePaletteMode,
  handleSearchDialogOpen,
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
              {isSmUp &&
                (isMdDown ? (
                  <SearchButton
                    handleSearchDialogOpen={handleSearchDialogOpen}
                  />
                ) : (
                  <SearchBar />
                ))}
              {!isSmDown && (
                <>
                  {user && <MyPageButton />}
                  {user === null ? <SignInButton /> : <SignOutButton />}
                </>
              )}
              <PaletteModeSwitch togglePaletteMode={togglePaletteMode} />
            </Box>
          </Toolbar>
        </Grid>
        <Grid item xs={0} md={1} lg={2} />
      </Grid>
    </Box>
  );
};

export default NavBar;
