import { marketsStart, marketsSuccess, marketsError } from "./marketsActions";
import axios from "axios";

export const loadMarketsAsync = () => async (dispatch) => {
  try {
    dispatch(marketsStart());
    await axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        dispatch(marketsSuccess(res.data));
      });
  } catch (error) {
    dispatch(marketsError(error));
  }
};
