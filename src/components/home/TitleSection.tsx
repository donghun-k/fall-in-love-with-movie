import { Box, Button, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import logoImage from '../../assets/logo3.png';
import { Link } from 'react-router-dom';

const TitleSection = () => {
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
          backgroundImage: `url(${logoImage})`,
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
