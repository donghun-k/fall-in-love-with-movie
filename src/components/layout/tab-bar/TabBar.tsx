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
        label="홈"
      />
      <Tab
        onClick={handleSearchBtnClick}
        sx={{
          flexGrow: 1,
        }}
        icon={<SearchIcon />}
        label="검색"
      />
      {user ? (
        <>
          <Tab
            sx={{
              flexGrow: 1,
            }}
            icon={<AccountCircleIcon />}
            label="마이 페이지"
          />
          <Tab
            onClick={handleSignOutBtnClick}
            sx={{
              flexGrow: 1,
            }}
            icon={<LogoutIcon />}
            label="로그아웃"
          />
        </>
      ) : (
        <Tab
          onClick={handleSignInBtnClick}
          sx={{
            flexGrow: 1,
          }}
          icon={<LoginIcon />}
          label="로그인"
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
