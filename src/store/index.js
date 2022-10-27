import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import { success } from "redux-saga-requests";
import reducers from "./reducers";
import sagas from "./sagas";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { axios } from "./../modules/app";

const persistConfig = {
  key: "mtexpressStorage",
  storage,
};

const sagaMiddleware = createSagaMiddleware();
const middleware = routerMiddleware();
const composedEnhancers = composeWithDevTools(
  applyMiddleware(...[sagaMiddleware], middleware, thunk)
);

const reducer = combineReducers(reducers);

const rootReducer = (state = {}, action) => {
  let newState;
  const { app, ...rest } = state;
  // if(action.type === success(USER_LOGOUT)){
  // newState = rest;
  // }else {
  newState = state;
  // }
  return reducer(newState, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, composedEnhancers);
export const persistor = persistStore(store);

sagaMiddleware.run(sagas);
export default store;
