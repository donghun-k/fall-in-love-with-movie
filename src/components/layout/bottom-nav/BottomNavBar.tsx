import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../../hooks/useAuthContext';
import { User } from 'firebase/auth';
import { signOut } from '../../../api/auth';
import SearchDialog from './SearchDialog';

const BottomNavBar = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [openSearchBox, setOpenSearchBox] = useState(false);

  const handleHomeBtnClick = () => {
    navigate('/');
  };
  const handleSearchBtnClick = () => {
    setOpenSearchBox(true);
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
  const handleSearchDialogClose = () => {
    setOpenSearchBox(false);
  };

  const props = {
    user,
    openSearchBox,
    handleHomeBtnClick,
    handleSearchBtnClick,
    handleSearchDialogClose,
    handleSignInBtnClick,
    handleSignOutBtnClick,
  };

  return <BottomNavBarView {...props} />;
};

interface ViewProps {
  user: User | null;
  openSearchBox: boolean;
  handleHomeBtnClick: () => void;
  handleSearchBtnClick: () => void;
  handleSearchDialogClose: () => void;
  handleSignInBtnClick: () => void;
  handleSignOutBtnClick: () => void;
}

const BottomNavBarView = ({
  user,
  openSearchBox,
  handleHomeBtnClick,
  handleSearchBtnClick,
  handleSearchDialogClose,
  handleSignInBtnClick,
  handleSignOutBtnClick,
}: ViewProps) => {
  return (
    <BottomNavigation
      showLabels
      sx={{
        position: 'sticky',
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
      <BottomNavigationAction
        onClick={handleHomeBtnClick}
        icon={<HomeIcon />}
        label="홈"
      />
      <BottomNavigationAction
        onClick={handleSearchBtnClick}
        icon={<SearchIcon />}
        label="검색"
      />
      {user && (
        <BottomNavigationAction icon={<AccountCircleIcon />} label="내 정보" />
      )}
      {user && (
        <BottomNavigationAction
          onClick={handleSignOutBtnClick}
          icon={<LogoutIcon />}
          label="로그아웃"
        />
      )}
      {!user && (
        <BottomNavigationAction
          onClick={handleSignInBtnClick}
          icon={<LoginIcon />}
          label="로그인"
        />
      )}
      <SearchDialog
        open={openSearchBox}
        handleSearchDialogClose={handleSearchDialogClose}
      />
    </BottomNavigation>
  );
};

export default BottomNavBar;
