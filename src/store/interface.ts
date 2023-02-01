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
  isLoggedIn : boolean | null;
}

// user
export interface IUser {
  uid: string | null;
  email: string;
  name: string;
  introduce: string;
}

export interface IUserPayload {
  uid: string;
  email: string | null;
}

export interface IUpdatePayloadUser {
  uid: string;
  email: string;
  name: string;

  isPet: boolean | null;

  petImg : string | null;
  petName: string | null;
  petType: string | null;
  petAge: number | null;
  petGender: string | null;
}