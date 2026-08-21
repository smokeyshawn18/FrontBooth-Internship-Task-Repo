import { configureStore } from '@reduxjs/toolkit'
import { api } from '../api/api'
import productsUIReducer from './slices/productsSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, // RTK Query cache (server state)
    productsUI: productsUIReducer, // plain slice (client-only state)
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
