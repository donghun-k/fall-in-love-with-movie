import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './authSlice';
import { paletteModeSlice } from './paletteModeSlice';
import { searchDialogSlice } from './searchDialogSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    paletteMode: paletteModeSlice.reducer,
    searchDialog: searchDialogSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
