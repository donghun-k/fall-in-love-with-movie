import { PaletteMode } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

export interface PaletteModeState {
  paletteMode: PaletteMode;
}

const initialState: PaletteModeState = {
  paletteMode: 'dark',
};

export const paletteModeSlice = createSlice({
  name: 'paletteMode',
  initialState,
  reducers: {
    togglePaletteMode: (state) => {
      state.paletteMode = state.paletteMode === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { togglePaletteMode } = paletteModeSlice.actions;
