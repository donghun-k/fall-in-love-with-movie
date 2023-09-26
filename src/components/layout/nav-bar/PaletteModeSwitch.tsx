import { PaletteMode, Switch, useTheme } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

interface Props {
  togglePaletteMode: () => void;
}

const PaletteModeSwitch = ({ togglePaletteMode }: Props) => {
  const mode = useTheme().palette.mode;

  const props = {
    mode,
    handleSwitchChange: togglePaletteMode,
  };

  return <PaletteModeSwitchView {...props} />;
};

interface ViewProps {
  mode: PaletteMode;
  handleSwitchChange: () => void;
}

const PaletteModeSwitchView = ({ mode, handleSwitchChange }: ViewProps) => {
  return (
    <Switch
      sx={{
        '&.MuiSwitch-root': {
          padding: '8px 0',
          width: '60px',
          height: '50px',
          '& .MuiButtonBase-root': {
            width: '28px',
            height: '28px',
            margin: '11px 4px',
            color: 'text.primary',
            backgroundColor: 'background.default',
            transition: '0.3s',
            '&.Mui-checked': {
              transform: 'translateX(24px)',
            },
            '& .MuiSvgIcon-root': {
              fontSize: '18px',
            },
          },
          '& .MuiSwitch-track': {
            backgroundColor: 'primary.light',
            borderRadius: '50px',
          },
        },
      }}
      icon={<LightModeIcon />}
      checkedIcon={<DarkModeIcon />}
      checked={mode === 'dark'}
      onChange={handleSwitchChange}
    />
  );
};

export default PaletteModeSwitch;
