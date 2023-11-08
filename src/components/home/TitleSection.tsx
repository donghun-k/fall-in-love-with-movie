import { Box, Button, PaletteMode, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import usePalletteMode from '../../hooks/usePaletteMode';
import LOGO_IMAGES from '../../utils/logo';
import useAuthContext from '../../hooks/useAuthContext';
import { User } from 'firebase/auth';

const TitleSection = () => {
  const mode = usePalletteMode();
  const { user } = useAuthContext();

  const props = {
    mode,
    user,
  };

  return <TitleSectionView {...props} />;
};

interface ViewProps {
  mode: PaletteMode;
  user: User | null;
}

const TitleSectionView = ({ mode, user }: ViewProps) => {
  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: { xs: 'calc(100vh - 160px)', sm: 'calc(100vh - 80px)' },
        gap: '10px',
        paddingBottom: '80px',
      }}
    >
      <Box
        component="div"
        sx={{
          width: { xs: '150px', md: '200px' },
          height: { xs: '120px', md: '160px' },
          backgroundImage: `url(${LOGO_IMAGES[mode].logoIcon})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></Box>
      <Typography
        sx={{
          fontSize: { xs: '20px', md: '30px' },
          color: 'text.secondary',
          fontWeight: 'bold',
          '& span': {
            fontSize: { xs: '30px', md: '45px' },
            color: 'text.primary',
          },
        }}
      >
        <span>F</span>all <span>I</span>n <span>L</span>ove with <span>M</span>
        ovie
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: '16px', md: '20px' },
          marginBottom: {
            xs: '10px',
            sm: '15px',
          },
        }}
      >
        영화 별점 평가 및 코멘트 서비스
      </Typography>
      {!user && (
        <Link to="/signin">
          <Button
            variant="contained"
            size="large"
            endIcon={<LoginIcon />}
            sx={{
              color: '#fff',
            }}
          >
            시작하기
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default TitleSection;
