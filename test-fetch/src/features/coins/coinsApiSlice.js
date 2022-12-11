import { apiSlice } from "../../app/api/apiSlice";

export const coinsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCurrencies: build.query({
      query: () => {
        return {
          url: "/api/currency",
          method: "GET",
        };
      },
    }),
    getTrendingCoins: build.query({
      query: () => {
        return {
          url: "/api/trending",
          method: "GET",
        };
      },
    }),
    getCoinsHistoryChart: build.query({
      query: (arg) => {
        const { coinID, days } = arg;
        return {
          url: `/api/historyChart?coinID=${coinID}&days=${days}`,
          method: "GET",
        };
      },
    }),
    getCoinsExchangeRates: build.query({
      query: () => {
        return {
          url: `https://api.coingecko.com/api/v3/exchange_rates`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetCurrenciesQuery,
  useGetTrendingCoinsQuery,
  useGetCoinsHistoryChartQuery,
  useGetCoinsExchangeRatesQuery,
} = coinsApiSlice;
