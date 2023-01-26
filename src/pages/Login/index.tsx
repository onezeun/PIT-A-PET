import React from 'react';
import * as S from './Login.styles';

export default function Login(): JSX.Element {
  return (
    <>
      <S.LoginContainer>
        <S.LoginContent>
          <img src={process.env.PUBLIC_URL + '/images/b_chr.png'} alt="로고" />
          <h1>로그인</h1>
          <S.LoginWrap>
            <form>
              <S.InputWrap>
                <S.SubTitle htmlFor="loginId" className='subTitle'>아이디</S.SubTitle>
                <S.LoginInput type="text" id="loginId" className="loginInput"></S.LoginInput>
              </S.InputWrap>
              <S.InputWrap>
                <S.SubTitle htmlFor="loginPassword" className='subTitle'>비밀번호</S.SubTitle>
                <S.LoginInput type="password" id="loginPassword" className="loginInput"></S.LoginInput>
              </S.InputWrap>
              <button>로그인</button>
            </form>
            <S.LinkWrap>
              <a href='#' className='googleLogin'>구글계정으로 로그인하기</a>
              <a href='#' className='register'>회원가입하러가기</a>
            </S.LinkWrap>
          </S.LoginWrap>
        </S.LoginContent>
      </S.LoginContainer>
    </>
  );
}
