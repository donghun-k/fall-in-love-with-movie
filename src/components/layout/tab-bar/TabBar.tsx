import { Box, Tab } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchBox from './SearchBox';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../../hooks/useAuthContext';
import { User } from 'firebase/auth';
import { signOut } from '../../../api/auth';

const TabBar = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [isSearchBoxOpened, setIsSearchBoxOpened] = useState(false);

  const handleHomeBtnClick = () => {
    navigate('/');
  };
  const handleSearchBtnClick = () => {
    setIsSearchBoxOpened(true);
  };
  const handleSignInBtnClick = () => {
    navigate('/signin');
  };
  const handleSignOutBtnClick = async () => {
    try {
      await signOut();
      alert('Sign out successfully!');
    } catch (error) {
      console.error(error);
    }
  };
  const closeSearchBox = () => {
    setIsSearchBoxOpened(false);
  };

  const props = {
    user,
    isSearchBoxOpened,
    handleHomeBtnClick,
    handleSearchBtnClick,
    handleSignInBtnClick,
    handleSignOutBtnClick,
    closeSearchBox,
  };

  return <TabBarView {...props} />;
};

interface ViewProps {
  user: User | null;
  isSearchBoxOpened: boolean;
  handleHomeBtnClick: () => void;
  handleSearchBtnClick: () => void;
  handleSignInBtnClick: () => void;
  handleSignOutBtnClick: () => void;
  closeSearchBox: () => void;
}

const TabBarView = ({
  user,
  isSearchBoxOpened,
  handleHomeBtnClick,
  handleSearchBtnClick,
  handleSignInBtnClick,
  handleSignOutBtnClick,
  closeSearchBox,
}: ViewProps) => {
  return (
    <Box
      component="nav"
      position="sticky"
      sx={{
        backgroundColor: 'background.nav',
        display: { xs: 'flex', sm: 'none' },
        bottom: 0,
        flexDirection: 'row',
        height: '80px',
        width: '100vw',
        zIndex: 100,
        overflow: 'hidden',
      }}
    >
      <Tab
        onClick={handleHomeBtnClick}
        sx={{
          flexGrow: 1,
        }}
        icon={<HomeIcon />}
        label="HOME"
      />
      <Tab
        onClick={handleSearchBtnClick}
        sx={{
          flexGrow: 1,
        }}
        icon={<SearchIcon />}
        label="SEARCH"
      />
      {user ? (
        <>
          <Tab
            sx={{
              flexGrow: 1,
            }}
            icon={<AccountCircleIcon />}
            label="MY PAGE"
          />
          <Tab
            onClick={handleSignOutBtnClick}
            sx={{
              flexGrow: 1,
            }}
            icon={<LogoutIcon />}
            label="SIGN OUT"
          />
        </>
      ) : (
        <Tab
          onClick={handleSignInBtnClick}
          sx={{
            flexGrow: 1,
          }}
          icon={<LoginIcon />}
          label="SIGNIN"
        />
      )}
      <SearchBox
        isSearchBoxOpened={isSearchBoxOpened}
        closeSearchBox={closeSearchBox}
      />
    </Box>
  );
};

export default TabBar;
