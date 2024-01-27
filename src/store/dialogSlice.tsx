import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DialogType } from '../components/layout/DialogContainer';

export interface DialogState {
  type: DialogType | null;
  props: any;
}

const initialState: DialogState = {
  type: null,
  props: null,
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<DialogState>) => {
      const { type, props } = action.payload;
      state.type = type;
      state.props = props;
    },
    closeDialog: (state) => {
      state.type = null;
      state.props = null;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
