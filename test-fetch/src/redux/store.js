// import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers/index";

const initialState = {};

const middleware = [thunk];

const store = legacy_createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
