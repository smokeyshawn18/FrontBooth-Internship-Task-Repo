import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Single base API instance for the whole app. Features call `api.injectEndpoints`
// instead of creating their own `createApi` — one cache, one middleware, one
// reducer, no matter how many feature slices of endpoints get added.
const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  refetchOnMountOrArgChange: 10,
  keepUnusedDataFor: 20,
  tagTypes: ["Product"],
  endpoints: () => ({}),
});
