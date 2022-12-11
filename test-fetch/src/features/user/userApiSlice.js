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
  }),
});

export const { useGetUserQuery } = userApiSlice;
