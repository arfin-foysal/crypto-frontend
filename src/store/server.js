import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./slices/authSlice";
import toast from "react-hot-toast";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    // console.log('sending refresh token')
    // // send refresh token to get new access token
    // const refreshResult = await baseQuery('/refresh', api, extraOptions)
    // console.log(refreshResult)
    // if (refreshResult?.data) {
    //     const user = api.getState().auth.user
    //     // store the new token
    //     api.dispatch(setCredentials({ ...refreshResult.data, user }))
    //     // retry the original query with new access token
    //     result = await baseQuery(args, api, extraOptions)
    // } else {
    toast.error("Session Expired. Please login again");

    api.dispatch(logout());

    setTimeout(() => {
      // window.location.href = "/login";
      window.location.reload(false);
    }, 3000);
  }

  return result;
};

export const server = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Admin"],
  reducerPath: "apiSlice",

  endpoints: (builder) => ({}),
});
