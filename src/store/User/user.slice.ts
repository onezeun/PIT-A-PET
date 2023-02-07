import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AsyncType } from 'common/asyncType';
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  where,
  query,
} from '@firebase/firestore';
import { db } from '../../Firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
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
        let data = doc.data();
        data.id = doc.id;
        if(data.userImg == undefined) {
          data.userImg = null;
        }
        getData = data;
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
  async ({id, uid, userImg}: IUpdatePayloadUser, { rejectWithValue }) => {
    try {
      const userDoc = doc(db, 'users', id);
        if(userImg != null) {
          const storage = getStorage();
          const storageRef = ref(storage, 'userprofilephoto/' + userImg.name);
          let userImgUrl;
          await uploadBytes(storageRef, userImg);
          await getDownloadURL(ref(storage, 'userprofilephoto/' + userImg.name)).then(
            (url) => {
              userImgUrl = url;
            },
          );
          await updateDoc(userDoc, {
            userImg : userImgUrl,
          })
        };
      return rejectWithValue('업로드 성공');
    } catch (err) {
      throw rejectWithValue('업로드 실패');
    }
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

      builder
      // 대기중
      .addCase(updateUser.pending, (state, action) => {
        state.updateError = null;
        state.updateLoading = 'pending';
      })
      // 성공
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateError = null;
        state.updateLoading = 'succeeded';
      })
      // 거절
      .addCase(updateUser.rejected, (state, action) => {
        state.updateError = action.payload as string;
        state.updateLoading = 'failed';
      });
  },
});

// export const { setUserId, setname } = authSlice.actions;
export default userSlice.reducer;
