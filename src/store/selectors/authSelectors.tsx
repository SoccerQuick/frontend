import { RootState } from '../reducers';

// selectors 추출반환 함수
export const userSelector = (state: RootState) => state.auth.user;
export const tokenSelector = (state: RootState) => state.auth.token;
export const isLogInSelector = (state: RootState) => state.auth.isLogIn;
