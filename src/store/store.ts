import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './modules/auth.slice';
import { petSlice } from './modules/pet.slice';
import { userSlice } from './modules/user.slice';
import { postSlice } from './modules/post.slice';
import { chatSlice } from './modules/chat.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    pet: petSlice.reducer,
    post: postSlice.reducer,
    chat: chatSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}),
  devTools: process.env.NODE_ENV !== 'production',
});

// store 타입지정
export type RootState = ReturnType<typeof store.getState>;
// dispatch 타입지정
export type AppDispatch = typeof store.dispatch;
