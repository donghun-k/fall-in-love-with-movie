import { IconButton, useTheme } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

interface Props {
  onClick: () => void;
}

const ToggleModeButton = ({ onClick }: Props) => {
  const theme = useTheme();
  return (
    <IconButton
      sx={{
        color: 'text.secondary',
        transition: '0.3s',
        '&:hover': {
          filter: 'brightness(1.5)',
        },
      }}
      onClick={onClick}
    >
      {theme.palette.mode === 'dark' ? (
        <DarkModeIcon fontSize="large" />
      ) : (
        <LightModeIcon fontSize="large" />
      )}
    </IconButton>
  );
};

export default ToggleModeButton;
