# Product CRUD — React + TS + Redux Toolkit + json-server + React Hook Form + Zod

## Project layout

```
crud-app/
├── .env                              # VITE_API_URL for json-server
├── db.json                           # json-server "database"
├── src/
│   ├── main.tsx                      # renders <App> wrapped in <Provider store={store}>
│   ├── App.tsx
│   ├── api/
│   │   ├── api.ts                    # the ONE createApi instance, empty endpoints
│   │   └── productsApi.ts            # injects the products CRUD endpoints onto api.ts
│   ├── redux/
│   │   ├── store.ts                  # configureStore — mounts api reducer + every slice
│   │   ├── hook.ts                   # typed useAppDispatch / useAppSelector
│   │   └── slices/
│   │       └── productsSlice.ts      # client-only UI state (which row is being edited)
│   └── features/
│       └── products/
│           ├── types.ts              # Zod schema + inferred Product / ProductFormValues
│           ├── ProductForm.tsx       # React Hook Form + zodResolver
│           ├── ProductList.tsx       # table with edit/delete
│           └── index.ts              # barrel export for the feature
```

## Why it's structured this way

**`api/api.ts` is the single `createApi` call.** Every feature's API file (`api/productsApi.ts`
here) calls `api.injectEndpoints({ ... })` instead of creating its own instance. One cache, one
middleware, one reducer key (`state.api`) no matter how many features you add — add
`api/ordersApi.ts` later and it injects into the same `api`.

**`redux/slices/` is for client state, not server state.** `productsSlice.ts` only tracks
`editingProductId` — pure UI state that doesn't belong to the server. Product data itself lives in
the RTK Query cache (`useGetProductsQuery`), never duplicated into the slice. `App.tsx` reads
`editingProductId` from the slice and looks up the matching row from the RTK Query cache.

| State type | Tool |
|---|---|
| Data from the server | RTK Query (`api/*.ts`, `injectEndpoints`, no slice) |
| UI-only state (selected id, filters, modals) | `redux/slices/*.ts` (`createSlice`) |

**Zod is the single source of truth for the form.** `features/products/types.ts` defines
`productSchema` with `z.object(...)`, and `ProductFormValues` is `z.infer<typeof productSchema>` —
not hand-written separately. `ProductForm.tsx` wires it in with `resolver: zodResolver(productSchema)`,
so validation rules and the TS type can never drift apart.

## Running it

```bash
npm install
npm run dev:all   # json-server on :4000 + Vite on :5173
```

Or in two terminals: `npm run server` and `npm run dev`. Open http://localhost:5173.

## CRUD flow

The list and the form are two separate screens, not stacked on one page — `App.tsx` renders one or
the other based on `productsUI.view` (`'list' | 'form'`).

- **Read** — `ProductList` calls `useGetProductsQuery(searchTerm || undefined)`. Typing in the
  search box updates local state instantly, but the actual Redux `searchTerm` (and therefore the
  network request) only updates 300ms after typing stops — a debounce, so you're not firing a
  request per keystroke. The search itself is server-side, via json-server's `?q=` full-text search.
- **Create** — clicking "+ Add product" dispatches `openAddForm()`, switching to the form screen
  with `editingProductId: null`. Submitting calls `useAddProductMutation()`, which invalidates the
  `LIST` tag so the list refetches once you're back.
- **Update** — clicking Edit dispatches `openEditForm(id)`, switching to the form screen.
  `App.tsx` resolves the product from an *unfiltered* `useGetProductsQuery()` call (deliberately
  ignoring the list's search term, so editing never breaks if the row would've been filtered out)
  and passes it to `ProductForm`, which `reset()`s to repopulate. Submitting calls
  `useUpdateProductMutation()`.
- **Delete** — `ProductList` calls `useDeleteProductMutation()` directly per row, no confirmation
  screen needed since it doesn't require the form.
- **Back to list** — either the form's "Back to list" button or a successful submit calls
  `closeForm()`, switching `view` back to `'list'`.

## Next steps

- Add `api/ordersApi.ts` under a new `features/orders/` to see the multi-feature pattern in practice.
- Add optimistic updates to `updateProduct`/`deleteProduct` via RTK Query's `onQueryStarted`.
- Add a `.refine()` on `productSchema` for cross-field validation if you need it later.
