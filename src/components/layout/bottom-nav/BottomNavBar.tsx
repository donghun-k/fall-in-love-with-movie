import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { signOut } from '../../../api/auth';
import { useSnackbar } from 'notistack';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';

interface Props {
  handleSearchDialogOpen: () => void;
}

const BottomNavBar = ({ handleSearchDialogOpen }: Props) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user, isCheckingAuth } = useSelector(
    (state: RootState) => state.auth
  );

  const handleHomeBtnClick = () => {
    navigate('/');
  };
  const handleMyPageBtnClick = () => {
    navigate('/mypage');
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
      enqueueSnackbar('로그아웃 되었습니다.', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('로그아웃에 실패하였습니다.', {
        variant: 'error',
      });
    }
  };

  const props = {
    user,
    isCheckingAuth,
    handleHomeBtnClick,
    handleMyPageBtnClick,
    handleSearchBtnClick,
    handleSignInBtnClick,
    handleSignOutBtnClick,
  };

  return <BottomNavBarView {...props} />;
};

interface ViewProps {
  user: User | null;
  isCheckingAuth: boolean;
  handleHomeBtnClick: () => void;
  handleMyPageBtnClick: () => void;
  handleSearchBtnClick: () => void;
  handleSignInBtnClick: () => void;
  handleSignOutBtnClick: () => void;
}

const BottomNavBarView = ({
  user,
  isCheckingAuth,
  handleHomeBtnClick,
  handleMyPageBtnClick,
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
      {!isCheckingAuth && user && (
        <BottomNavigationAction
          onClick={handleMyPageBtnClick}
          icon={<AccountCircleIcon />}
          label="내 정보"
        />
      )}
      {!isCheckingAuth && user && (
        <BottomNavigationAction
          onClick={handleSignOutBtnClick}
          icon={<LogoutIcon />}
          label="로그아웃"
        />
      )}
      {!isCheckingAuth && !user && (
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
