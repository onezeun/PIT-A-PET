import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncType } from 'common/asyncType';
import {
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  collection,
  where,
  query,
  onSnapshot,
  orderBy,
} from '@firebase/firestore';
import { db } from '../../Firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { ICreateChatRoomPayload, IAddMessagePayload } from '../interface';

// 초기 상태 타입
interface ChatState {
  id: string;
  uid: string;
  message: string | null;
  date: Date | null;

  addLoading: AsyncType;
  addError: string | null;

  getLoading: AsyncType;
  getError: string | null;

  addMsgLoading: AsyncType;
  addMsgError: string | null;

  getMsgLoading: AsyncType;
  getMsgError: string | null;

  deleteLoading: AsyncType;
  deleteError: string | null;
}

// 초기 상태
const initialState: ChatState = {
  id: '',
  uid: '',
  message: '',
  date: null,

  addLoading: 'idle',
  addError: null,

  getLoading: 'idle',
  getError: null,

  addMsgLoading: 'idle',
  addMsgError: null,

  getMsgLoading: 'idle',
  getMsgError: null,

  deleteLoading: 'idle',
  deleteError: null,
};

export const createChatRoom = createAsyncThunk(
  'chat/CREATE_CHATROOM',
  async ({ uid, userName }: ICreateChatRoomPayload, { rejectWithValue }) => {
    try {
      await addDoc(collection(db, 'chatrooms'), {
        uid: uid,
        userName: userName,
      });
    } catch (err) {
      throw rejectWithValue('채팅방 만들기 실패');
    }
  },
);

export const getChatRoom = createAsyncThunk(
  'chat/GET_CHATROOM',
  async (currentUid: string, { rejectWithValue }) => {
    try {
      const petsDoc = collection(db, 'chatrooms');
      const q = query(
        petsDoc,
        where('uid', 'array-contains', currentUid),
      ) as any;
      const querySnapshot = await getDocs(q);
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

export const addMessage = createAsyncThunk(
  'chat/ADD_MESSAGE',
  async (
    { id, uid, message, date }: IAddMessagePayload,
    { rejectWithValue },
  ): Promise<IAddMessagePayload> => {
    try {
      const chatRoomDoc = collection(db, 'chatrooms');
      await addDoc(collection(chatRoomDoc, id, 'messages'), {
        id: id,
        uid: uid,
        message: message,
        date: date,
      });
      return {
        id: id,
        uid: uid,
        message: message,
        date: date,
      };
    } catch (err) {
      throw rejectWithValue('메세지 전송 실패');
    }
  },
);

export const getMessage = createAsyncThunk(
  'chat/GET_MESSAGE',
  async (id: string, { rejectWithValue }) => {
    try {
      let getData: any = [];
      const chatRoomDoc = collection(db, 'chatrooms');
      const q = query(
        collection(chatRoomDoc, id, 'messages'),
        orderBy('date', 'asc'),
      );
      await onSnapshot(q, (data) => {
        data.forEach((doc) => {
          let data = doc.data();
          getData.push(data);
        });
      });
      return getData;
    } catch (err) {
      throw rejectWithValue('메세지 불러오기 실패');
    }
  },
);

export const deleteChatRoom = createAsyncThunk(
  'chat/DELETE_CHATROOM',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'pets', id));
      return rejectWithValue('삭제 성공');
    } catch (err) {
      throw rejectWithValue('삭제 실패');
    }
  },
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 대기중
      .addCase(createChatRoom.pending, (state, action) => {
        state.addError = null;
        state.addLoading = 'pending';
      })
      // 성공
      .addCase(createChatRoom.fulfilled, (state, action) => {
        state.addError = null;
        state.addLoading = 'succeeded';
      })
      // 거절
      .addCase(createChatRoom.rejected, (state, action) => {
        state.addError = action.payload as string;
        state.addLoading = 'failed';
      });
    builder
      // 대기중
      .addCase(getChatRoom.pending, (state, action) => {
        state.getError = null;
        state.getLoading = 'pending';
      })
      // 성공
      .addCase(getChatRoom.fulfilled, (state, action) => {
        state.getError = null;
        state.getLoading = 'succeeded';
      })
      // 거절
      .addCase(getChatRoom.rejected, (state, action) => {
        state.getError = action.payload as string;
        state.getLoading = 'failed';
      });
    builder
      // 대기중
      .addCase(addMessage.pending, (state, action) => {
        state.addMsgError = null;
        state.addMsgLoading = 'pending';
      })
      // 성공
      .addCase(addMessage.fulfilled, (state, action) => {
        state.addMsgError = null;
        state.addMsgLoading = 'succeeded';
      })
      // 거절
      .addCase(addMessage.rejected, (state, action) => {
        state.addMsgError = action.payload as string;
        state.addMsgLoading = 'failed';
      });

    builder
      // 대기중
      .addCase(getMessage.pending, (state, action) => {
        state.getMsgError = null;
        state.getMsgLoading = 'pending';
      })
      // 성공
      .addCase(getMessage.fulfilled, (state, action) => {
        state.getMsgError = null;
        state.getMsgLoading = 'succeeded';
      })
      // 거절
      .addCase(getMessage.rejected, (state, action) => {
        state.getMsgError = action.payload as string;
        state.getMsgLoading = 'failed';
      });

    builder
      // 대기중
      .addCase(deleteChatRoom.pending, (state, action) => {
        state.deleteError = null;
        state.deleteLoading = 'pending';
      })
      // 성공
      .addCase(deleteChatRoom.fulfilled, (state, action) => {
        state.deleteError = null;
        state.deleteLoading = 'succeeded';
      })
      // 거절
      .addCase(deleteChatRoom.rejected, (state, action) => {
        state.deleteError = action.payload as string;
        state.deleteLoading = 'failed';
      });
  },
});

export default chatSlice.reducer;
