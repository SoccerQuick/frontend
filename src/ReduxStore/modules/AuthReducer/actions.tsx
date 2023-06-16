import { User } from '../../../store/reducers/authSlice';
import authActionTypes from './actionTypes';

export const login = (user: User) => ({
  type: authActionTypes.LOGIN,
  payload: user,
});

export const logout = () => ({
  type: authActionTypes.LOGOUT,
});

export const updateUser = (user: User) => ({
  type: authActionTypes.UPDATE_USER,
  payload: user,
});
