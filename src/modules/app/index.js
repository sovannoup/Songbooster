import { put, takeLatest } from "redux-saga/effects";
import { error, success } from "redux-saga-requests";
import { APP_REFRESH, CHANGE_LANGUAGE } from "./reducer";
import axiosDefault from "axios";
import { API_URL } from "./config";
import { store } from "./../../store";
import { USER_LOGOUT } from "./../user/reducer";

const baseURL = API_URL;
export const axios = axiosDefault.create({
  baseURL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

axios.interceptors.request.use(
  function (config) {
    var cookie = store.getState();

    if (config.data) {
      console.log("config", config.headers);
      if (config.headers["Content-Type"] == "multipart/form-data") {
        config.data.append("currentLanguage", cookie.app.currentLanguage);
      } else {
        config.data = {
          ...config.data,
          currentLanguage: cookie.app.currentLanguage,
        };
        config.params = { currentLanguage: cookie.app.currentLanguage };
      }
    } else {
      // config.data = {currentLanguage : cookie.app.currentLanguage}
      console.log("params", cookie);
      config.params = { currentLanguage: cookie.app.currentLanguage };
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // console.log('interceptors', response);
    return response;
  },
  (error) => {
    try {
      if (error.response && error.response.status === 401) {
        store.dispatch({ type: USER_LOGOUT });
      } else if (error.response && error.response.status === 402) {
        alert(
          "You have no permission for this action, please contact your administrator!"
        );
      }
      return Promise.reject(error.response);
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

export function* appRefreshWorker() {
  try {
    var cookie = store.getState();
    if (cookie.user && cookie.user.token) {
      console.log("cookie.user.token", cookie.user.token);
      yield (axios.defaults.headers.common = {
        Authorization: `Bearer ${cookie.user.token}`,
      });
    }
    yield put({
      type: success(APP_REFRESH),
    });
  } catch (e) {
    yield put({
      type: error(APP_REFRESH),
    });
  }
}

export function* changeLanguage({ payload }) {
  try {
    yield (axios.defaults.headers.common = {
      currentLanguage: payload,
    });
    console.log("change language success");
    yield put({
      type: success(CHANGE_LANGUAGE),
      payload: { currentLanguage: payload },
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    // yield call(window.location.reload())
  } catch (e) {
    console.log(e);
    yield put({
      type: error(CHANGE_LANGUAGE),
      payload: { currentLanguage: "en" },
    });
  }
}

export function* appSaga() {
  yield takeLatest(APP_REFRESH, appRefreshWorker);
  yield takeLatest(CHANGE_LANGUAGE, changeLanguage);
}
