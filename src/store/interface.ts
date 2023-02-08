// 액션 payload 타입
// signup
export interface ISignUpPayload {
  email: string;
  password: string;
  name: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginSuccess {
  token: string;
  uid: string;
  email: string | null;
  name: string | null;

  sessionData: JSON | null;
  currentUserData: JSON | null;
}

// user
export interface IUserPayload {
  data?: {
    uid: string;
    email: string;
    userName: string;

    isPet: boolean | null;
  };
}
export interface IUpdatePayloadUser { 
  id: string;
  uid: string;
  userImg: any | null;
}

// pet
export interface IAddPetPayload {
  uid: string;
  petImg: any | null;
  petName: string | null;
  petType: string | null;
  petAge: string | null;
  petGender: string | null;
}

export interface IUpdatePetPayload extends IAddPetPayload {
  id: string;
}

// post
export interface IAddPostPayload {
  uid: string;
  postContent: string | null;
  postImg: any | null;
  postDate: Date | null;
}

export interface IUpdatePostPayload extends IAddPostPayload {
  id: string;
}
