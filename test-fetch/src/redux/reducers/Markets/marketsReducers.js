import * as ActionTypes from "./marketsTypes";
const initialState = {
  markets: null,
  // isloading: true,
  // errorMessage: null,
};
const marketsReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.MARKETS_LOAD_START:
      return {
        ...state,
        // isloading: true,
        markets: null,
      };
    case ActionTypes.MARKETS_LOAD_SUCCESS:
      return {
        ...state,
        // isloading: false,
        markets: payload,
      };
    case ActionTypes.MARKETS_LOAD_ERROR:
      return {
        ...state,
        // isloading: false,
        // errorMessage: payload,
      };
    default:
      return state;
  }
};

export default marketsReducers;
