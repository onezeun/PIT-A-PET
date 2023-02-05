import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AsyncType } from 'common/asyncType';
import {
  doc,
  addDoc,
  getDocs,
  setDoc,
  updateDoc,
  collection,
  where,
  query,
} from '@firebase/firestore';
import { db } from '../../Firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { IPetPayload } from '../interface';

// 초기 상태 타입
interface PetState {
  uid: string;
  petImg: any | null;
  petName: string | null;
  petType: string | null;
  petAge: string | null;
  petGender: string | null;

  addLoading: AsyncType;
  addError: string | null;
}

// 초기 상태
const initialState: PetState = {
  uid: '',
  petImg: null,
  petName: null,
  petType: null,
  petAge: null,
  petGender: null,

  addLoading: 'idle',
  addError: null,
};

export const createPet = createAsyncThunk(
  'user/CREATE_PET',
  async (
    { uid, petImg, petName, petType, petAge, petGender }: IPetPayload,
    { rejectWithValue },
  ): Promise<IPetPayload> => {
    try {
      // if(uid === null) {
      //   throw rejectWithValue('유저정보오류');
      // }
      let petImgUrl;
      const storage = getStorage();
      const storageRef = ref(storage, 'petimages/' + petImg.name);
      await uploadBytes(storageRef, petImg);
      await addDoc(collection(db, 'pets'), {
        uid: uid,
        petImg: 'petimages/' + petImg.name,
        petName: petName,
        petType: petType,
        petAge: petAge,
        petGender: petGender,
      });
      return {
        uid: uid,
        petImg: 'petimages/' + petImg.name,
        petName: petName,
        petType: petType,
        petAge: petAge,
        petGender: petGender,
      };
    } catch (err) {
      throw rejectWithValue('데이터불러오기실패');
    }
  },
);

export const updatePet = createAsyncThunk(
  'user/UPDATE_PET',
  async (userRequest: IPetPayload, { rejectWithValue }) => {
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
      .addCase(createPet.pending, (state, action) => {
        state.addError = null;
        state.addLoading = 'pending';
      })
      // 성공
      .addCase(createPet.fulfilled, (state, action) => {
        state.addError = null;
        state.addLoading = 'succeeded';

        // state.userData = action.payload.data;
      })
      // 거절
      .addCase(createPet.rejected, (state, action) => {
        state.addError = action.payload as string;
        state.addLoading = 'failed';
      });
  },
});

// export const { setUserId, setname } = authSlice.actions;
export default userSlice.reducer;
