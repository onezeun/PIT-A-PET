import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './Auth/auth.slice';

export const store = configureStore({
  reducer: { 
    auth: authSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
})

// store 타입지정
export type RootState = ReturnType<typeof store.getState>

// dispatch 타입지정
export type AppDispatch = typeof store.dispatch