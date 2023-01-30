import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/user'

export const store = configureStore({
  reducer: { 
    user: userReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
})

// store 타입 지정
export type RootState = ReturnType<typeof store.getState>

// dispatch 타입 지정
export type AppDispatch = typeof store.dispatch