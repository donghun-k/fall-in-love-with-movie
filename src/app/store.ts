import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../features/auth/authSlice';
import { paletteModeSlice } from '../features/paletteMode/paletteModeSlice';
import { searchDialogSlice } from '../features/searchDialog/searchDialogSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    paletteMode: paletteModeSlice.reducer,
    searchDialog: searchDialogSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
