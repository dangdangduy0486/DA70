import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: (email) => {
        return {
          url: `api/user/user-info/${email}`,
        };
      },
    }),
    getUserReciepts: build.query({
      query: (email) => {
        return {
          url: `/api/user/get-order/${email}`,
        };
      },
    }),
    getUserWallet: build.query({
      query: ({ email }) => {
        console.log(email);
        return {
          url: `api/wallet/info/${email}`,
        };
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserRecieptsQuery,
  useGetUserWalletQuery,
} = userApiSlice;
