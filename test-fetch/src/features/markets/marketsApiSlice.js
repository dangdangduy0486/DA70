import { apiSlice } from "../../app/api/apiSlice";

export const marketsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getMarkets: build.query({
      query: (arg) => {
        const { vs_currency, page } = arg;
        return {
          url: "/api/markets",
          method: "GET",
          params: {
            vs_currency,
            page,
          },
        };
      },
    }),
  }),
});

export const { useGetMarketsQuery } = marketsApiSlice;
