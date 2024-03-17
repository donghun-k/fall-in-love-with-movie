import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store';
import { togglePaletteMode } from '../store/paletteModeSlice';

const usePaletteMode = () => {
  const dispatch = useDispatch();
  const { paletteMode } = useSelector((state: RootState) => state.paletteMode);

  const handleTogglePaletteMode = () => {
    dispatch(togglePaletteMode());
  };

  return { paletteMode, handleTogglePaletteMode };
};

export default usePaletteMode;
