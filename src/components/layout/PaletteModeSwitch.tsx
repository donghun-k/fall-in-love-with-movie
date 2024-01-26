import { Switch } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { togglePaletteMode } from '../../store/paletteModeSlice';

const PaletteModeSwitch = () => {
  const { paletteMode } = useSelector((state: RootState) => state.paletteMode);
  const dispatch = useDispatch();

  const handleSwitchChange = () => {
    dispatch(togglePaletteMode());
  };

  return (
    <Switch
      inputProps={{
        'aria-label': 'dark mode',
      }}
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
            '&:hover': {
              backgroundColor: 'background.default',
            },
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
      checked={paletteMode === 'dark'}
      onChange={handleSwitchChange}
    />
  );
};

export default PaletteModeSwitch;
