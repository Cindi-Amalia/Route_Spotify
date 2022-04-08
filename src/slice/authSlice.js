import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: '',
    isAuthorized: false,
    user: {},
  },
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthorized = true;
      state.user = action.payload.user;

      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('expiredDate', action.payload.expiredDate);
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state, _) => {
      state.accessToken = '';
      state.isAuthorized = false;
      state.user = {};

      localStorage.removeItem('accessToken');
      localStorage.removeItem('expiredDate');
    },
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;