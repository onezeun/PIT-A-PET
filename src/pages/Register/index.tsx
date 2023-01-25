import React from 'react';
import * as S from './Register.styles';
import PetInfo from './PetInfo';

import logoPath from '../../assets/images/b_chr.png';

export default function Register(): JSX.Element {
  return (
    <>
      <S.RegisterContainer>
        <S.RegisterContent>
          <img src={logoPath} alt="로고" className='logoImg' />
          <h1>회원가입</h1>
          <div className="registerWrap">
            <form>
              <div className="inputWrap">
                <label htmlFor="registerId" className="subTitle">
                  아이디
                </label>
                <input
                  type="text"
                  id="registerId"
                  className="registerInput"
                ></input>
              </div>
              <div className="inputWrap">
                <label htmlFor="registerPassword" className="subTitle">
                  이름
                </label>
                <input
                  type="text"
                  id="registerPassword"
                  className="registerInput"
                ></input>
              </div>
              <div className="inputWrap">
                <label htmlFor="registerPassword" className="subTitle">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="registerPassword"
                  className="registerInput"
                ></input>
              </div>
              <div className="inputWrap">
                <label htmlFor="registerPassword" className="subTitle">
                  비밀번호 확인
                </label>
                <input
                  type="password"
                  id="registerPassword"
                  className="registerInput"
                ></input>
              </div>
              <S.PetCheck>
                <p>반려동물이 있으신가요?</p>
                <input type="radio" name="pet" id="y_pet"></input>
                <label htmlFor="y_pet">네</label>
                <input type="radio" name="pet" id="n_pet"></input>
                <label htmlFor="n_pet">아니오</label>
              </S.PetCheck>
              <PetInfo />
              <button className='registerBtn'>회원가입</button>
            </form>
            <div className="linkWrap"></div>
            <a href="#" className="googleLogin">
              구글계정으로 회원가입
            </a>
            <a href="#" className="register">
              로그인하러가기
            </a>
          </div>
        </S.RegisterContent>
      </S.RegisterContainer>
    </>
  );
}
