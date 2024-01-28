import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './authSlice';
import { paletteModeSlice } from './paletteModeSlice';
import { dialogSlice } from './dialogSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    paletteMode: paletteModeSlice.reducer,
    dialog: dialogSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
