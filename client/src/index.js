import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { AUTH_USER } from "./actions/types";

import App from "./components/App";
import reducers from "./reducers";

const createStoreWithMiddleWare = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleWare(reducers);
const token = localStorage.getItem("token");
// if we have a token programatically route to dash
if (token) {
  store.dispatch({
    type: AUTH_USER
  });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
