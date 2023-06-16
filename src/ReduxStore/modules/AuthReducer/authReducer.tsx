import authActionTypes from './actionTypes';

export type AuthType = {
  isLogin: boolean;
  user: UserType | null;
};

export type UserType = {
  user_id: string;
  name: string;
  nickname: string;
  role: string;
  profile: string;
};

const initialState = {
  isLogin: false,
  user: null,
};

// interface LoginAction {
//   type: typeof authActionTypes.LOGIN;
//   payload: UserType;
// }

// interface LogoutAction {
//   type: typeof authActionTypes.LOGOUT;
//   payload: UserType | null;
// }

// interface UpdateUserAction {
//   type: typeof authActionTypes.UPDATE_USER;
//   payload: UserType;
// }

function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case authActionTypes.LOGIN:
      return { ...state, isLogin: true, user: action.payload };
    case authActionTypes.LOGOUT:
      return {
        ...state,
        isLogin: false,
        user: null,
      };
    case authActionTypes.UPDATE_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export default authReducer;
