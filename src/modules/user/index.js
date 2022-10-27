import { call, put, takeLatest } from "redux-saga/effects";
import { error, success } from "redux-saga-requests";
import { axios } from "../app";
import {
    LOGIN,
    USER_LOGOUT
} from "./reducer";
import {normalizeData} from '../../utils/normalize'

export function* userLoginWorker({ payload }) {
    try {
        const login = yield call(axios.post, "/login", payload);
        console.log('login', login);

        yield put({
            type: success(LOGIN),
            payload: {
                login: normalizeData(login),
                token: login.data.token
            }
        });

        if(login.data && login.data.token){
            yield (axios.defaults.headers.common = {
                Authorization: `Bearer ${login.data.token}`,
            });
        }
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        var message = parseError;
        message = message.data.message
        console.log('message', parseError);
        yield put({
            type: error(LOGIN),
            payload: {errorMessage: message}
        });
    }
}


export function* userLogoutWorker() {
    try {
        yield (axios.defaults.headers.common = {
            Authorization: "",
        });        
        yield put({
            type: success(USER_LOGOUT),
            payload: {
                login: false
            }
        });
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        const message = parseError;
        yield put({
            type: error(USER_LOGOUT),
            payload: message.data ? message.data: message
        });
    }
}

export function* userSaga() {
    yield takeLatest(LOGIN, userLoginWorker);
    yield takeLatest(USER_LOGOUT, userLogoutWorker);
}
  