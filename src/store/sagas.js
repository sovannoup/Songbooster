import { all } from "redux-saga/effects";
import { appSaga } from "../modules/app";
// import { userSaga } from "../modules/user";
// import { dashboardSaga } from "../modules/dashboard";
// import { homeSaga } from "../modules/home";

const sagas = [appSaga()];

export default function* () {
  yield all(sagas);
}
