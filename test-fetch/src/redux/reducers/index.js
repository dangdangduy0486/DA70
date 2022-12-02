import { combineReducers } from "redux";
import marketsReducers from "./Markets/marketsReducers";

const rootReducer = () =>
  combineReducers({
    markets: marketsReducers,
  });

export default rootReducer;
