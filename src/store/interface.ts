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
  uid: string;
  email: string;
  userName: string;

  isPet: boolean | null;
}

// pet
export interface IPetPayload {
  petImg: string | null;
  petName: string | null;
  petType: string | null;
  petAge: number | null;
  petGender: string | null;
}