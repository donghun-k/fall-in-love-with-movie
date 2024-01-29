import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { DialogInfo } from '../components/layout/DialogContainer';

export interface DialogState {
  dialogInfo: DialogInfo;
}

const initialState: DialogState = {
  dialogInfo: {
    type: null,
    props: null,
  },
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<DialogInfo>) => {
      const dialogInfo = action.payload;
      state.dialogInfo = dialogInfo;
    },
    closeDialog: (state) => {
      state.dialogInfo = {
        type: null,
        props: null,
      };
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
