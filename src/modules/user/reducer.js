import { success, error, abort } from "redux-saga-requests";

export const LOGIN = 'LOGIN'
export const USER_LOGOUT = "USER_LOGOUT"

export const userLogin = payload => ({
  type: LOGIN,
  payload
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});

const initialState = {
  loading: false,
  error: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * LOGIN
     */
    case LOGIN:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case success(LOGIN):         
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    case error(LOGIN):
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: true
      };
    case abort(LOGIN):
      return { ...state, loading: false };

       /**
     * USER_LOGOUT
     */
    case USER_LOGOUT:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case success(USER_LOGOUT):         
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    case error(USER_LOGOUT):
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: true
      };
    case abort(USER_LOGOUT):
      return { ...state, loading: false };
    /**
     * DEFAULT CASE
     */
    default:
      return state;
  }
}

export default userReducer;