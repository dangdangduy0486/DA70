import { apiSlice } from "../../app/api/apiSlice";

export const marketsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getMarkets: build.query({
      query: (arg) => {
        const { vs_currency, order, perPage, page } = arg;
        return {
          url: "/api/markets",
          method: "GET",
          params: {
            vs_currency,
            order,
            perPage,
            page,
          },
        };
      },
    }),
  }),
});

export const { useGetMarketsQuery } = marketsApiSlice;
