import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncType } from 'common/asyncType';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  updateProfile,
  signOut,
} from '@firebase/auth';
import { ISignUpPayload, ILoginSuccess, ILoginPayload } from '../interface';
import { app, apiKey, auth, db } from '../../Firebase';
import { collection, addDoc } from 'firebase/firestore';

// 초기 상태 타입
interface AuthState {
  token: string | null;
  uid: string | null;
  email: string | null;
  name: string | null;

  signUpLoading: AsyncType;
  signUpError: string | null;

  loginLoading: AsyncType;
  loginError: string | null;

  logoutLoading: AsyncType;
  logoutError: string | null;
}

// 초기 상태
const initialState: AuthState = {
  token: null,
  uid: null,
  email: null,
  name: null,

  signUpLoading: 'idle',
  signUpError: null,

  loginLoading: 'idle',
  loginError: null,

  logoutLoading: 'idle',
  logoutError: null,
};

// 회원가입 요청
export const userSignUp = createAsyncThunk(
  'auth/USER_SIGN_UP',
  async ({ name, email, password,  }: ISignUpPayload, { rejectWithValue }, ): Promise<ILoginSuccess> => {
    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(app),
        email,
        password,
      );
      await updateProfile(userCredential.user, { displayName: name });
      await addDoc(collection(db, 'users'), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        userName: name,
      });
      return {
        token: await userCredential.user.getIdToken(),
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        name: userCredential.user.displayName,
      };
    } catch (err: any) {
      switch (err.code) {
        case 'auth/weak-password':
          throw rejectWithValue('비밀번호 형식을 확인해주세요');
          break;
        case 'auth/invalid-email':
          throw rejectWithValue('잘못된 형식의 이메일입니다.');
          break;
        case 'auth/email-already-in-use':
          throw rejectWithValue('이미 가입되어 있는 계정입니다');
          break;
      }
      throw rejectWithValue('회원가입실패~');
    }
  },
);

// 로그인
export const userLogin = createAsyncThunk(
  'auth/USER_LOGIN',
  async ({ email, password }: ILoginPayload,{ rejectWithValue, dispatch },): Promise<ILoginSuccess> => {
    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return {
        token: await userCredential.user.getIdToken(),
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        name: userCredential.user.displayName,
      };
    } catch (err: any) {
      switch (err.code) {
        case 'auth/user-not-found':
          throw rejectWithValue('등록되지 않은 회원입니다.');
          break;
        case 'auth/wrong-password':
          throw rejectWithValue('비밀번호를 다시 확인해주세요.');
          break;
      }
      console.log(err);
      throw rejectWithValue('로그인실패');
    }
  },
);

// 로그아웃
export const userLogout = createAsyncThunk('auth/USER_LOGOUT', async () => {
  await signOut(auth);
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 대기중
      .addCase(userSignUp.pending, (state, action) => {
        state.signUpError = null;
        state.signUpLoading = 'pending';
      })
      // 성공
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.signUpError = null;
        state.signUpLoading = 'succeeded';

        state.token = action.payload.token;
        state.email = action.payload.email;
        state.uid = action.payload.uid;
        state.name = action.payload.name;
      })
      // 거절
      .addCase(userSignUp.rejected, (state, action) => {
        state.signUpError = action.payload as string;
        state.signUpLoading = 'failed';

        state.token = null;
        state.email = null;
        state.uid = null;
      });
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.loginError = null;
        state.loginLoading = 'pending';
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loginError = null;
        state.loginLoading = 'succeeded';

        state.email = action.payload.email;
        state.token = action.payload.token;
        state.uid = action.payload.uid;
        state.name = action.payload.name;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loginError = action.payload as string;
        state.loginLoading = 'failed';

        state.email = null;
        state.token = null;
        state.uid = null;
      });
    builder
      .addCase(userLogout.pending, (state, action) => {
        state.loginError = null;
        state.loginLoading = 'pending';
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.loginError = null;
        state.loginLoading = 'succeeded';

        state.email = null;
        state.token = null;
        state.uid = null;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loginError = action.payload as string;
        state.loginLoading = 'failed';
      });
  },
});

// export const { setUserId, setname } = authSlice.actions;
export default authSlice.reducer;
