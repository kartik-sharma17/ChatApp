import { configureStore } from '@reduxjs/toolkit'
import { rootApislice } from './services/rootApislice'
import userReducer from './slice/userData';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [rootApislice.reducerPath]: rootApislice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApislice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch