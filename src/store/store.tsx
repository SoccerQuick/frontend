import authSlice, { AuthState } from './reducers/authSlice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

export type RootState = {
  auth: AuthState;
};

const rootReducer = combineReducers<RootState>({
  auth: authSlice,
});

const store = configureStore({ reducer: rootReducer });

export default store;
