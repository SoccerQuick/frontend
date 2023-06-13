import React from 'react';
import { combineReducers } from 'redux';
import fetchDataReducer from './TeamPage/reducer';
import authSlice from '../../store/reducers/authSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  data: fetchDataReducer,
  auth: authSlice,
  // 다른 리듀서 경로 추가
});

export default rootReducer;

// redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'data'],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
