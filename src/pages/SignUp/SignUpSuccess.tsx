import React from 'react';
import * as S from './SignUp.styles';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Button from 'components/Button';

export default function SignUpSuccess(): JSX.Element {
  const navigate = useNavigate();
  let user = useSelector((state: RootState) => state.auth.name);

  console.log(user);

  return (
    <>
      <S.SuccessTitle>
        <span>{user}</span>님 반갑습니다🤗
        <p>다양한 반려동물을 만나고 공유해보세요.</p>
      </S.SuccessTitle>
      <Button
        margin="0 20px 0 0"
        buttonColor="YELLOW_100"
        onClick={() => {
          navigate('/');
        }}
      >
        홈으로
      </Button>
      <Button
        buttonColor="BLUE"
        fontColor="WHITE"
        onClick={() => {
          navigate('/mypage');
        }}
      >
        반려동물 등록하기
      </Button>
    </>
  );
}
