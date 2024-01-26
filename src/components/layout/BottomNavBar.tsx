import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

import { openSearchDialog } from '../../store/searchDialogSlice';
import { RootState } from '../../store';
import { signOut } from '../../services/auth';

const BottomNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user, isCheckingAuth } = useSelector(
    (state: RootState) => state.auth
  );

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleSearch = () => {
    dispatch(openSearchDialog());
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      enqueueSnackbar('로그아웃 되었습니다.', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('로그아웃에 실패하였습니다.', { variant: 'error' });
    }
  };

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
        onClick={() => handleNavigate('/')}
        icon={<HomeIcon />}
        label="홈"
      />
      <BottomNavigationAction
        onClick={handleSearch}
        icon={<SearchIcon />}
        label="검색"
      />
      {!isCheckingAuth && user && (
        <BottomNavigationAction
          onClick={() => handleNavigate('/mypage')}
          icon={<AccountCircleIcon />}
          label="내 정보"
        />
      )}
      {!isCheckingAuth && user && (
        <BottomNavigationAction
          onClick={handleSignOut}
          icon={<LogoutIcon />}
          label="로그아웃"
        />
      )}
      {!isCheckingAuth && !user && (
        <BottomNavigationAction
          onClick={() => handleNavigate('/signin')}
          icon={<LoginIcon />}
          label="로그인"
        />
      )}
    </BottomNavigation>
  );
};

export default BottomNavBar;
