import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AsyncType } from 'common/asyncType';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  updateProfile
} from '@firebase/auth';
import { ISignUpPayload, ILoginSuccess, ILoginPayload } from '../interface';
import { app, apiKey } from '../../Firebase';

// 초기 상태 타입
interface AuthState {
  token: string | null;
  uid: string | null;
  email: string | null;
  name: string | null;

  loginLoading: AsyncType;
  loginError: string | null;
  sessionKey?: boolean | null;

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
  sessionKey: null,

  signUpLoading: 'idle',
  signUpError: null,
};

const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`

// 회원가입 요청
export const UserSignUp = createAsyncThunk(
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
      await updateProfile(userCredential.user, {displayName: name})
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
export const UserLogin = createAsyncThunk(
  'auth/USER_LOGIN',
  async ({ email, password }: ILoginPayload, { rejectWithValue, dispatch }, ): Promise<ILoginSuccess> => {
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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 대기중
      .addCase(UserSignUp.pending, (state, action) => {
        state.signUpError = null;
        state.signUpLoading = 'pending';
      })
      // 성공
      .addCase(UserSignUp.fulfilled, (state, action) => {
        state.signUpError = null;
        state.signUpLoading = 'succeeded';

        state.token = action.payload.token;
        state.email = action.payload.email;
        state.uid = action.payload.uid;
        state.name = action.payload.name;
        state.sessionKey = sessionStorage.getItem(_session_key) ? true : false;
      })
      // 거절
      .addCase(UserSignUp.rejected, (state, action) => {
        state.signUpError = action.payload as string;
        state.signUpLoading = 'failed';

        state.token = null;
        state.email = null;
        state.uid = null;
      });
    builder
      .addCase(UserLogin.pending, (state, action) => {
        state.loginError = null;
        state.loginLoading = 'pending';
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.loginError = null;
        state.loginLoading = 'succeeded';

        state.email = action.payload.email;
        state.token = action.payload.token;
        state.uid = action.payload.uid;
        state.name = action.payload.name;
        state.sessionKey = sessionStorage.getItem(_session_key) ? true : false;
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.loginError = action.payload as string;
        state.loginLoading = 'failed';

        state.email = null;
        state.token = null;
        state.uid = null;
      });
  },
});

// export const { setUserId, setname } = authSlice.actions;
export default authSlice.reducer;
