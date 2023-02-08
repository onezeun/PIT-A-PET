import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncType } from 'common/asyncType';
import {
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
} from '@firebase/firestore';
import { db } from '../../Firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { IAddPostPayload, IUpdatePostPayload } from '../interface';

// 초기 상태 타입
interface PostState {
  postData?: {
    id: string;
    uid: string;
    postContent: string | null;
    postImg: File | null;
    postDate: Date | null;
  };

  addLoading: AsyncType;
  addError: string | null;

  getLoading: AsyncType;
  getError: string | null;
  lastPage: any;

  updateLoading: AsyncType;
  updateError: string | null;

  deleteLoading: AsyncType;
  deleteError: string | null;
}

// 초기 상태
const initialState: PostState = {
  postData: {
    id: '',
    uid: '',
    postContent: '',
    postImg: null,
    postDate: null,
  },

  addLoading: 'idle',
  addError: null,

  getLoading: 'idle',
  getError: null,
  lastPage: null,

  updateLoading: 'idle',
  updateError: null,

  deleteLoading: 'idle',
  deleteError: null,
};

export const addPost = createAsyncThunk(
  'post/ADD_POST',
  async (
    { uid, postContent, postImg, postDate }: IAddPostPayload,
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
        postDate: postDate,
      });
      return {
        uid: uid,
        postContent: postContent,
        postImg: postImgUrl,
        postDate: postDate,
      };
    } catch (err) {
      throw rejectWithValue('글 작성 실패');
    }
  },
);

export const getAllPost = createAsyncThunk(
  'post/GET_ALL_POST',
  async () => {
    try {
      const postsDoc = collection(db, 'posts');
      let getData: any = [];

        const q = query(postsDoc, orderBy('postDate', 'desc'));
        const querySnapshot = await getDocs(q);
        // lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        querySnapshot.forEach((doc: any) => {
          let data = doc.data();
          data.id = doc.id;
          getData.push(data);
        })
      return getData
    } catch (err) {
      console.log(err);
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
          postContent: postContent,
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
      }
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
    builder
      // 대기중
      .addCase(getAllPost.pending, (state, action) => {
        state.addError = null;
        state.addLoading = 'pending';
      })
      // 성공
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.addError = null;
        state.addLoading = 'succeeded';

        state.postData = action.payload.data;
        state.lastPage = action.payload.lastPage;
      })
      // 거절
      .addCase(getAllPost.rejected, (state, action) => {
        state.addError = action.payload as string;
        state.addLoading = 'failed';
      });
  },
});

export default postSlice.reducer;
