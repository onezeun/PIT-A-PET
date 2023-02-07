import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './modules/auth.slice';
import { petSlice } from './modules/pet.slice';
import { userSlice } from './modules/user.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    pet: petSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

// store 타입지정
export type RootState = ReturnType<typeof store.getState>;
// dispatch 타입지정
export type AppDispatch = typeof store.dispatch;
