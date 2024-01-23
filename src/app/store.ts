import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../features/auth/authSlice';
import { paletteModeSlice } from '../features/paletteMode/paletteModeSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    paletteMode: paletteModeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
