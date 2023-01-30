import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  name: string,
  age: number
}

const initialState = { name: 'John', age: 20 } as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      const name = action.payload;
      state.name = name;
    },
    setAge(state, action: PayloadAction<number>) {
      const age = action.payload;
      state.age = age;
    },
  },
});

export const { setName, setAge } = userSlice.actions;
export default userSlice.reducer
