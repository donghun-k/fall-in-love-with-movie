import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const MyPageButton = () => {
  return (
    <Link to="/mypage">
      <Button
        sx={{
          height: '50px',
        }}
        variant="text"
      >
        <AccountCircleIcon fontSize="large" />
        <Typography
          variant="subtitle2"
          pt={0.5}
          ml={0.5}
          fontWeight={600}
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          내 정보
        </Typography>
      </Button>
    </Link>
  );
};

export default MyPageButton;
