import { createSlice } from '@reduxjs/toolkit';

export interface SearchDialogState {
  openDialog: boolean;
}

const initialState: SearchDialogState = {
  openDialog: false,
};

export const searchDialogSlice = createSlice({
  name: 'searchDialog',
  initialState,
  reducers: {
    openSearchDialog: (state) => {
      state.openDialog = true;
    },
    closeSearchDialog: (state) => {
      state.openDialog = false;
    },
  },
});

export const { openSearchDialog, closeSearchDialog } =
  searchDialogSlice.actions;
