import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncType } from 'common/asyncType';
import {
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  where,
  query,
} from '@firebase/firestore';
import { db } from '../../Firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { IAddPetPayload, IUpdatePetPayload } from '../interface';

// 초기 상태 타입
interface PetState {
  petsData?: {
    id: string;
    uid: string;
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

  updateLoading: AsyncType;
  updateError: string | null;

  deleteLoading: AsyncType;
  deleteError: string | null;
}

// 초기 상태
const initialState: PetState = {
  petsData: {
    id: '',
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

  updateLoading: 'idle',
  updateError: null,

  deleteLoading: 'idle',
  deleteError: null,
};

export const createPet = createAsyncThunk(
  'pet/CREATE_PET',
  async (
    { uid, petImg, petName, petType, petAge, petGender }: IAddPetPayload,
    { rejectWithValue },
  ): Promise<IAddPetPayload> => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, 'petimages/' + petImg.name);
      let petImgUrl;
      await uploadBytes(storageRef, petImg);
      await getDownloadURL(ref(storage, 'petimages/' + petImg.name)).then(
        (url) => {
          petImgUrl = url;
          console.log(url);
        },
      );
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
        let data = doc.data();
        data.id = doc.id;
        getData.push(data);
      });
      return getData;
    } catch (err) {
      throw rejectWithValue('데이터불러오기실패');
    }
  },
);

export const updatePet = createAsyncThunk(
  'pet/UPDATE_PET',
  async (
    { id, petImg, petName, petType, petAge, petGender }: IUpdatePetPayload,
    { rejectWithValue },
  ) => {
    try {
      const petDoc = doc(db, 'pets', id);
      if (petImg == null) {
        await updateDoc(petDoc, {
          petName: petName,
          petType: petType,
          petAge: petAge,
          petGender: petGender,
        });
      } else {
        const storage = getStorage();
        const storageRef = ref(storage, 'petimages/' + petImg.name);
        let petImgUrl;
        await uploadBytes(storageRef, petImg);
        await getDownloadURL(ref(storage, 'petimages/' + petImg.name)).then(
          (url) => {
            petImgUrl = url;
          },
        );
        await updateDoc(petDoc, {
          petImg: petImgUrl,
          petName: petName,
          petType: petType,
          petAge: petAge,
          petGender: petGender,
        });
      };
      return rejectWithValue('업데이트 성공');
    } catch (err) {
      throw rejectWithValue('업데이트 실패');
    }
  },
);

export const deletePet = createAsyncThunk(
  'pet/DELETE_PET',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'pets', id));
      return rejectWithValue('삭제 성공');
    } catch (err) {
      throw rejectWithValue('삭제 실패');
    }
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

        state.petsData = action.payload.data;
      })
      // 거절
      .addCase(getPet.rejected, (state, action) => {
        state.getError = action.payload as string;
        state.getLoading = 'failed';
      });
    builder
      // 대기중
      .addCase(updatePet.pending, (state, action) => {
        state.updateError = null;
        state.updateLoading = 'pending';
      })
      // 성공
      .addCase(updatePet.fulfilled, (state, action) => {
        state.updateError = null;
        state.updateLoading = 'succeeded';
      })
      // 거절
      .addCase(updatePet.rejected, (state, action) => {
        state.updateError = action.payload as string;
        state.updateLoading = 'failed';
      });

      builder
      // 대기중
      .addCase(deletePet.pending, (state, action) => {
        state.updateError = null;
        state.updateLoading = 'pending';
      })
      // 성공
      .addCase(deletePet.fulfilled, (state, action) => {
        state.updateError = null;
        state.updateLoading = 'succeeded';
      })
      // 거절
      .addCase(deletePet.rejected, (state, action) => {
        state.updateError = action.payload as string;
        state.updateLoading = 'failed';
      });
  },
});

// export const { setUserId, setname } = authSlice.actions;
export default petSlice.reducer;
