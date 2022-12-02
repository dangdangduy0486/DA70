import * as ActionTypes from "./marketsTypes";

// export const getMarkets = () => async (dispatch) => {
//   try {
//     const res = await axios.get(
//       "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false"
//     );
//     dispatch({
//       type: MARKETS_LOAD_SUCCESS,
//       payload: res.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: MARKETS_LOAD_ERROR,
//       payload: console.log(error),
//     });
//   }
// };

export const marketsStart = () => {
  return {
    type: ActionTypes.MARKETS_LOAD_START,
  };
};

export const marketsSuccess = (markets) => {
  return {
    type: ActionTypes.MARKETS_LOAD_SUCCESS,
    payload: markets,
  };
};

export const marketsError = (errorMessage) => {
  return {
    type: ActionTypes.MARKETS_LOAD_ERROR,
    payload: errorMessage,
  };
};
