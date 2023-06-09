import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  isLogIn: boolean;
  user: User | null;
  token: string | null;
};

export type User = {
  user_id: string;
  name: string;
  nickname: string;
  role: string;
};

const initialState: AuthState = {
  isLogIn: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auths',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isLogIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLogIn = false;
      state.user = null;
      state.token = null;
    },
  },
});

// actions 생성함수
export const AUTH_ACTIONS = {
  login: authSlice.actions.login,
  logout: authSlice.actions.logout,
};

export default authSlice.reducer;
