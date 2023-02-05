import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AsyncType } from 'common/asyncType';
import {
  doc,
  addDoc,
  getDocs,
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
  petsData?: {
    uid: string | null;
    petImg: any | null;
    petName: string | null;
    petType: string | null;
    petAge: string | null;
    petGender: string | null;
  };

  addLoading: AsyncType;
  addError: string | null;

  getLoading: AsyncType;
  getError: string | null;
}

// 초기 상태
const initialState: PetState = {
  petsData: {
    uid: '',
    petImg: null,
    petName: null,
    petType: null,
    petAge: null,
    petGender: null,
  },

  addLoading: 'idle',
  addError: null,

  getLoading: 'idle',
  getError: null,
};

export const createPet = createAsyncThunk(
  'pet/CREATE_PET',
  async (
    { uid, petImg, petName, petType, petAge, petGender }: IPetPayload,
    { rejectWithValue },
  ): Promise<IPetPayload> => {
    try {
      // if(uid === null) {
      //   throw rejectWithValue('유저정보오류');
      // }
      const storage = getStorage();
      const storageRef = ref(storage, 'petimages/' + petImg.name);
      let petImgUrl
      await uploadBytes(storageRef, petImg);
      await getDownloadURL(ref(storage, 'petimages/' + petImg.name)).then((url) => {
        petImgUrl = url
        console.log(url);
      });
      await addDoc(collection(db, 'pets'), {
        uid: uid,
        petImg: petImgUrl,
        petName: petName,
        petType: petType,
        petAge: petAge,
        petGender: petGender,
      });
      return {
        uid: uid,
        petImg: petImgUrl,
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

export const getPet = createAsyncThunk(
  'pet/GET_PET',
  async (uid: string, { rejectWithValue }) => {
    try {
      const petsDoc = collection(db, 'pets');
      const q = query(petsDoc, where('uid', '==', uid)) as any;
      const querySnapshot = (await getDocs(q)) as any;
      let getData: any = [];
      querySnapshot.forEach((doc: any) => {
        getData.push(doc.data());
      });
      return getData;
    } catch (err) {
      throw rejectWithValue('데이터불러오기실패');
    }
  },
);

export const updatePet = createAsyncThunk(
  'pet/UPDATE_PET',
  async (userRequest: IPetPayload, { rejectWithValue }) => {
    try {
    } catch (err) {}
  },
);

export const petSlice = createSlice({
  name: 'pet',
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
      })
      // 거절
      .addCase(createPet.rejected, (state, action) => {
        state.addError = action.payload as string;
        state.addLoading = 'failed';
      });
    builder
      // 대기중
      .addCase(getPet.pending, (state, action) => {
        state.getError = null;
        state.getLoading = 'pending';
      })
      // 성공
      .addCase(getPet.fulfilled, (state, action) => {
        state.getError = null;
        state.getLoading = 'succeeded';

        state.petsData = action.payload;
      })
      // 거절
      .addCase(getPet.rejected, (state, action) => {
        state.getError = action.payload as string;
        state.getLoading = 'failed';
      });
  },
});

// export const { setUserId, setname } = authSlice.actions;
export default petSlice.reducer;
