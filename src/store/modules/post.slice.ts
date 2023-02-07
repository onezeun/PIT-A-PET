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
import { IAddPostPayload, IUpdatePostPayload } from '../interface';

// 초기 상태 타입
interface PostState {
  PostData?: {
    id: string;
    uid: string;
    postContent : string | null;
    postImg : File | null;
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
const initialState: PostState = {
  PostData: {
    id: '',
    uid: '',
    postContent:'',
    postImg: null,
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

export const addPost = createAsyncThunk(
  'post/ADD_POST',
  async (
    { uid, postContent, postImg }: IAddPostPayload,
    { rejectWithValue },
  ): Promise<IAddPostPayload> => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, 'postimages/' + postImg.name);
      let postImgUrl;
      await uploadBytes(storageRef, postImg);
      await getDownloadURL(ref(storage, 'postimages/' + postImg.name)).then(
        (url) => {
          postImgUrl = url;
        },
      );
      await addDoc(collection(db, 'posts'), {
        uid: uid,
        postContent: postContent,
        postImg: postImgUrl,
      });
      return {
        uid: uid,
        postContent: postContent,
        postImg: postImgUrl,
      };
    } catch (err) {
      throw rejectWithValue('글 작성 실패');
    }
  },
);

export const getPost = createAsyncThunk(
  'post/GET_POST',
  async (uid: string, { rejectWithValue }) => {
    try {
      const postsDoc = collection(db, 'post');
      const q = query(postsDoc, where('uid', '==', uid)) as any;
      const querySnapshot = (await getDocs(q)) as any;
      let getData: any = [];
      querySnapshot.forEach((doc: any) => {
        let data = doc.data();
        data.id = doc.id;
        getData.push(data);
      });
      return getData;
    } catch (err) {
      throw rejectWithValue('글 불러오기 실패');
    }
  },
);

export const updatePost = createAsyncThunk(
  'post/UPDATE_POST',
  async (
    { id, postContent, postImg }: IUpdatePostPayload,
    { rejectWithValue },
  ) => {
    try {
      const postDoc = doc(db, 'posts', id);
      if (postImg == null) {
        await updateDoc(postDoc, {
          postContent: postContent
        });
      } else {
        const storage = getStorage();
        const storageRef = ref(storage, 'postimages/' + postImg.name);
        let postImgUrl;
        await uploadBytes(storageRef, postImg);
        await getDownloadURL(ref(storage, 'postimages/' + postImg.name)).then(
          (url) => {
            postImgUrl = url;
          },
        );
        await updateDoc(postDoc, {
          postContent: postContent,
          postImg: postImgUrl,
        });
      };
      return rejectWithValue('업데이트 성공');
    } catch (err) {
      throw rejectWithValue('업데이트 실패');
    }
  },
);

export const deletePost = createAsyncThunk(
  'post/DELETE_POST',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'posts', id));
      return rejectWithValue('삭제 성공');
    } catch (err) {
      throw rejectWithValue('삭제 실패');
    }
  },
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 대기중
      .addCase(addPost.pending, (state, action) => {
        state.addError = null;
        state.addLoading = 'pending';
      })
      // 성공
      .addCase(addPost.fulfilled, (state, action) => {
        state.addError = null;
        state.addLoading = 'succeeded';
      })
      // 거절
      .addCase(addPost.rejected, (state, action) => {
        state.addError = action.payload as string;
        state.addLoading = 'failed';
      });
  },
});

export default postSlice.reducer;
