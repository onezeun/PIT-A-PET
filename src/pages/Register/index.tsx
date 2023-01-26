import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './Register.styles';
import PetInfo from './PetInfo';


export default function Register(): JSX.Element {
  const navigate = useNavigate();
  const [petCheck, setPetCheck] = useState(false);

  const yesPet = (e :any) => {
    e.preventDefault();
    setPetCheck(true);
  }

  const noPet = (e :any) => {
    e.preventDefault();
    setPetCheck(false);
  }

  return (
    <>
      <S.RegisterContainer>
        <S.RegisterContent>
          <S.LogoImg
            src={process.env.PUBLIC_URL + '/images/b_chr.png'}
            alt="로고"
            className="logoImg"
            onClick={() => {navigate('/')}}
          />
          <h1>회원가입</h1>
          <div>
            <form>
              <S.InputWrap>
                <S.SubTitle htmlFor="registerId">아이디</S.SubTitle>
                <S.RegisterInput type="text" id="registerId"></S.RegisterInput>
              </S.InputWrap>
              <S.InputWrap>
                <S.SubTitle htmlFor="registerPassword">이름</S.SubTitle>
                <S.RegisterInput
                  type="text"
                  id="registerPassword"
                ></S.RegisterInput>
              </S.InputWrap>
              <S.InputWrap>
                <S.SubTitle htmlFor="registerPassword">비밀번호</S.SubTitle>
                <S.RegisterInput
                  type="password"
                  id="registerPassword"
                ></S.RegisterInput>
              </S.InputWrap>
              <S.InputWrap>
                <S.SubTitle htmlFor="registerPassword">
                  비밀번호 확인
                </S.SubTitle>
                <S.RegisterInput
                  type="password"
                  id="registerPassword"
                ></S.RegisterInput>
              </S.InputWrap>
              <S.PetCheck>
                <p>반려동물이 있으신가요?</p>
                <input type="radio" name="pet" id="y_pet"></input>
                <label htmlFor="y_pet" onClick={yesPet}>네</label>
                <input type="radio" name="pet" id="n_pet"></input>
                <label htmlFor="n_pet" onClick={noPet}>아니오</label>
              </S.PetCheck>
              {petCheck == true ? <PetInfo /> : null}
              <S.RegisterBtn>회원가입</S.RegisterBtn>
            </form>
            <S.LinkWrap>
              <a href="#" className="googleLogin">
                구글계정으로 회원가입
              </a>
              <a href="#" className="register" onClick={() => {navigate('/login')}}>
                로그인하러가기
              </a>
            </S.LinkWrap>
          </div>
        </S.RegisterContent>
      </S.RegisterContainer>
    </>
  );
}
