import { success, error, abort } from "redux-saga-requests";

export const APP_REFRESH = "APP_REFRESH";
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

export const appRefresh = () => ({
  type: APP_REFRESH,
});

const initialState = {
  loading: false,
  error: false,
  currentLanguage: "en",
};
const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case success(CHANGE_LANGUAGE):
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case error(CHANGE_LANGUAGE):
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: true,
      };
    case abort(CHANGE_LANGUAGE):
      return { ...state, loading: false };
    /**
     * DEFAULT CASE
     */
    default:
      return state;
  }
};

export default registerReducer;
