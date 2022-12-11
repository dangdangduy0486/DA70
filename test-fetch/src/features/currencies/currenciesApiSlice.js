import { apiSlice } from "../../app/api/apiSlice";

export const currenciesApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCurrencies: build.query({
      query: (vs_currency, page) => {
        return {
          url: "/api/currency",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetCurrenciesQuery } = currenciesApiSlice;
