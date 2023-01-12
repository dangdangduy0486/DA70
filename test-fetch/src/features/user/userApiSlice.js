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
        return {
          url: `api/wallet/info/${email}`,
        };
      },
    }),
    funding: build.mutation({
      query: ({ arg }) => {
        console.log(arg);
        // const { email, firstUnit, senderAddress, amount, recieverAddress } =
        //   arg;
        // return {
        //   url: `api/user/request/${email}/funding`,
        //   method: "POST",
        //   params: {
        //     firstUnit,
        //     senderAddress,
        //     amount,
        //     recieverAddress,
        //   },
        // };
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserRecieptsQuery,
  useGetUserWalletQuery,
  useFundingMutation,
} = userApiSlice;
