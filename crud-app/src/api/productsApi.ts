import {
  Product,
  ProductFormValues,
} from "../features/products/schema/product.schema";
import { api } from "./api";

// Injects this feature's endpoints onto the single shared `api` instance
// instead of calling `createApi` again. Every feature follows this same
// pattern, so the whole app shares one cache, one middleware, and one
// reducer under `state.api`.
export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Pass a search term to filter server-side via json-server's full-text
    // search (?q=). Omit it (or pass undefined) to get everything — each
    // distinct search term is its own cache entry.
    getProducts: builder.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { q: search } : undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product" as const, id: "LIST" },
            ]
          : [{ type: "Product" as const, id: "LIST" }],
    }),

    addProduct: builder.mutation<Product, ProductFormValues>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    updateProduct: builder.mutation<
      Product,
      { id: string } & ProductFormValues
    >({
      query: ({ id, ...patch }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),

    deleteProduct: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
