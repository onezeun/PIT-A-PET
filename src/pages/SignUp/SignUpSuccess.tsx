import React from 'react';
import * as S from './SignUp.styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

export default function SignUpSuccess(): JSX.Element {
  let user = useSelector((state: RootState) => state.auth.name);
  console.log(user);

  return (
    <>
      <p>OOO님의 회원가입을 축하합니다!</p>
      <button>홈으로</button>
      <button>반려동물 등록하기</button>
    </>
  )
}