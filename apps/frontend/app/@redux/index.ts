import { configureStore } from '@reduxjs/toolkit'
import { rootApislice } from './services/rootApislice'

export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApislice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch