import React from 'react';
import * as S from './Login.styles';

import logoPath from '../../assets/images/b_chr.png';

export default function Login(): JSX.Element {
  return (
    <>
      <S.LoginContainer>
        <S.LoginContent>
          <img src={logoPath} alt="로고" />
          <h1>로그인</h1>
          <div className="loginWrap">
            <form>
              <div className="inputWrap">
                <label htmlFor="loginId" className='subTitle'>아이디</label>
                <input type="text" id="loginId" className="loginInput"></input>
              </div>
              <div className="inputWrap">
                <label htmlFor="loginPassword" className='subTitle'>비밀번호</label>
                <input type="password" id="loginPassword" className="loginInput"></input>
              </div>
              <button>로그인</button>
            </form>
            <div className="linkWrap"></div>
            <a href='#' className='googleLogin'>구글계정으로 로그인하기</a>
            <a href='#' className='register'>회원가입하러가기</a>
          </div>
        </S.LoginContent>
      </S.LoginContainer>
    </>
  );
}
