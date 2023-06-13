import React from 'react';
import { combineReducers } from 'redux';
import fetchDataReducer from './TeamPage/reducer';
import authSlice from '../../store/reducers/authSlice';

const rootReducer = combineReducers({
  data: fetchDataReducer,
  auth: authSlice,
  // 다른 리듀서 경로 추가
});

export default rootReducer;
