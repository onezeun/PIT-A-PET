import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AsyncType } from 'common/asyncType';
import { doc, getDoc, setDoc, updateDoc } from '@firebase/firestore';
import { db } from 'Firebase';
import { IUpdatePayloadUser, IUserPayload } from '../interface';

// 초기 상태 타입
interface UserState {
  email: string;
  name: string;

  isPet: boolean | null;
  petImg: string | null;
  petName: string | null;
  petType: string | null;
  petAge: number | null;
  petGender: string | null;

  fetchLoading: AsyncType;
  fetchError: string | null;

  updateLoading: AsyncType;
  updateError: string | null;
}

// 초기 상태
const initialState: UserState = {
  email: '',
  name: '',

  isPet: null,
  petImg: null,
  petName: null,
  petType: null,
  petAge: null,
  petGender: null,

  fetchLoading: 'idle',
  fetchError: null,

  updateLoading: 'idle',
  updateError: null,
};

export const getUser = createAsyncThunk(
  'user/GET_USER',
  async (userRequest: IUpdatePayloadUser, { rejectWithValue }) => {
    try {

    } catch (err) {}
  },
);

export const updateUser = createAsyncThunk(
  'user/UPDATE_USER',
  async (userRequest: IUpdatePayloadUser, { rejectWithValue }) => {
    try {
    } catch (err) {}
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 대기중
      .addCase(getUser.pending, (state, action) => {})
      // 성공
      .addCase(getUser.fulfilled, (state, action) => {})
      // 거절
      .addCase(getUser.rejected, (state, action) => {});
  },
});

// export const { setUserId, setname } = authSlice.actions;
export default userSlice.reducer;
