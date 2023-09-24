import { Tab, Tabs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';

const TabBar = () => {
  return (
    <Tabs
      centered
      sx={{
        display: { xs: 'flex', sm: 'none' },
        position: 'fixed',
        bottom: 0,
        width: '100vw',
        '& a': {
          color: 'text.primary',
        },
      }}
    >
      <Tab
        sx={{
          flexGrow: 1,
        }}
        icon={
          <Link to="/">
            <HomeIcon />
          </Link>
        }
        label="HOME"
      />
      <Tab
        sx={{
          flexGrow: 1,
        }}
        icon={<SearchIcon />}
        label="SEARCH"
      />
      <Tab
        sx={{
          flexGrow: 1,
        }}
        icon={<LoginIcon />}
        label="SIGNIN"
      />
    </Tabs>
  );
};

export default TabBar;
