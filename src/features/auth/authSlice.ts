import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

export interface AuthState {
  user: User | null;
  isCheckingAuth: boolean;
}

const initialState: AuthState = {
  user: null,
  isCheckingAuth: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setIsCheckingAuth: (state, action: PayloadAction<boolean>) => {
      state.isCheckingAuth = action.payload;
    },
  },
});

export const { setUser, setIsCheckingAuth } = authSlice.actions;
