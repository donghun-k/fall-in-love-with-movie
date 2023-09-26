import { Box, Button, PaletteMode, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import usePalletteMode from '../../hooks/usePaletteMode';
import LOGO_IMAGES from '../../utils/logo';

const TitleSection = () => {
  const mode = usePalletteMode();

  const props = {
    mode,
  };

  return <TitleSectionView {...props} />;
};

interface ViewProps {
  mode: PaletteMode;
}

const TitleSectionView = ({ mode }: ViewProps) => {
  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 80px)',
        gap: '10px',
        paddingBottom: '80px',
      }}
    >
      <Box
        component="div"
        sx={{
          width: '250px',
          height: '200px',
          backgroundImage: `url(${LOGO_IMAGES[mode].logoIcon})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></Box>
      <Typography
        sx={{
          fontSize: { xs: '30px', md: '40px' },
          color: 'text.primary',
          fontWeight: 'bold',
          '& span': {
            fontSize: { xs: '45px', md: '60px' },
            color: 'primary.main',
          },
          marginBottom: '20px',
        }}
      >
        <span>F</span>all <span>I</span>n <span>L</span>ove with <span>M</span>
        ovie
      </Typography>
      <Link to="/signin">
        <Button
          variant="contained"
          size="large"
          endIcon={<LoginIcon />}
          sx={{
            color: '#fff',
          }}
        >
          Get Started
        </Button>
      </Link>
    </Box>
  );
};

export default TitleSection;
