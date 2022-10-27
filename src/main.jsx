import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Router } from "react-router";
import store from "./store";
import App from "./App";
import { persistor } from "./store";
const createHistory = require("history").createBrowserHistory;
import { PersistGate } from "redux-persist/integration/react";
const history = createHistory();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
