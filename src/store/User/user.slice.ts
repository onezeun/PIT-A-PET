import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AsyncType } from 'common/asyncType';
import {
  doc,
  getDocs,
  updateDoc,
  collection,
  where,
  query,
} from '@firebase/firestore';
import { db } from '../../Firebase';
import { IUpdatePayloadUser, IUserPayload } from '../interface';

// 초기 상태 타입
interface UserState {
  userData?: {
    uid: string;
    email: string;
    userName: string;

    isPet: boolean | null;
  };

  fetchLoading: AsyncType;
  fetchError: string | null;

  updateLoading: AsyncType;
  updateError: string | null;
}

// 초기 상태
const initialState: UserState = {
  userData: {
    uid: '',
    email: '',
    userName: '',

    isPet: null,
  },

  fetchLoading: 'idle',
  fetchError: null,

  updateLoading: 'idle',
  updateError: null,
};

export const getUser = createAsyncThunk(
  'user/GET_USER',
  async ( uid: string, { rejectWithValue }, ): Promise<IUserPayload> => {
    try {
      const userDoc = collection(db, 'users');
      const q = query(userDoc, where('uid', '==', uid)) as any;
      const querySnapshot = (await getDocs(q)) as any;
      let getData;
      querySnapshot.forEach((doc: any) => {
        getData = doc.data();
      });
      return {
        data: getData,
      };
    } catch (err) {
      throw rejectWithValue('데이터불러오기실패');
    }
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
      .addCase(getUser.pending, (state, action) => {
        state.fetchError = null;
        state.fetchLoading = 'pending';
      })
      // 성공
      .addCase(getUser.fulfilled, (state, action) => {
        state.fetchError = null;
        state.fetchLoading = 'succeeded';

        state.userData = action.payload.data;
      })
      // 거절
      .addCase(getUser.rejected, (state, action) => {
        state.fetchError = action.payload as string;
        state.fetchLoading = 'failed';
      });
  },
});

// export const { setUserId, setname } = authSlice.actions;
export default userSlice.reducer;
