import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../../hooks/useAuthContext';
import { User } from 'firebase/auth';
import { signOut } from '../../../api/auth';

interface Props {
  handleSearchDialogOpen: () => void;
}

const BottomNavBar = ({ handleSearchDialogOpen }: Props) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleHomeBtnClick = () => {
    navigate('/');
  };
  const handleSearchBtnClick = () => {
    handleSearchDialogOpen();
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

  const props = {
    user,
    handleHomeBtnClick,
    handleSearchBtnClick,
    handleSignInBtnClick,
    handleSignOutBtnClick,
  };

  return <BottomNavBarView {...props} />;
};

interface ViewProps {
  user: User | null;
  handleHomeBtnClick: () => void;
  handleSearchBtnClick: () => void;
  handleSignInBtnClick: () => void;
  handleSignOutBtnClick: () => void;
}

const BottomNavBarView = ({
  user,
  handleHomeBtnClick,
  handleSearchBtnClick,
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
    </BottomNavigation>
  );
};

export default BottomNavBar;
