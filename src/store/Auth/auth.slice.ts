import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AsyncType } from 'common/asyncType';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile
} from '@firebase/auth';
import { ISignUpPayload, ILoginPayload } from '../interface';


// 초기 상태 타입
interface AuthState {
  token: string | null;
  uid: string | null;
  email: string | null;
  name: string | null;

  loginLoading: AsyncType;
  loginError: string | null;

  signUpLoading: AsyncType;
  signUpError: string | null;
}

// 초기 상태
const initialState: AuthState = {
  token: null,
  uid: null,
  email: null,
  name: null,

  loginLoading: 'idle',
  loginError: null,

  signUpLoading: 'idle',
  signUpError: null,
};

// 회원가입 요청
export const signUpPost = createAsyncThunk(
  'auth/SIGN_UP',
  async ({ email, password }: ISignUpPayload, { rejectWithValue }) => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      // await updateProfile(userCredential.user, {displayName: name})
      return {
        token: await userCredential.user.getIdToken(),
        email: userCredential.user.email,
        uid: userCredential.user.uid,
      };
    } catch (err) {
      throw rejectWithValue('회원가입 실패');
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // 대기중
    .addCase(signUpPost.pending, (state, action) => {
      state.signUpError = null;
      state.signUpLoading = 'pending';
    })
    // 성공
    .addCase(signUpPost.fulfilled, (state, action) => {
      state.signUpError = null;
      state.signUpLoading = 'succeeded';

      state.token = action.payload.token;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    })
    // 거절
    .addCase(signUpPost.rejected, (state, action) => {
      state.signUpLoading = 'failed';
      state.signUpError = action.payload as string;

      state.token = null;
      state.email = null;
      state.uid = null;
    });
  }
});

// export const { setUserId, setname } = authSlice.actions;
export default authSlice.reducer;
