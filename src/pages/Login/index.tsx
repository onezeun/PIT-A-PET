import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { userLogin } from 'store/Auth/auth.slice';
import * as S from './Login.styles';

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);

  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState<any>('');

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (value === '') {
      setEmailErrorMessage('이메일을 입력해주세요');
      setEmailError(true);
    } else {
      setEmailErrorMessage('');
      setEmailError(false);
    }
    setEmail(value);
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (value === '') {
      setPasswordErrorMessage('비밀번호를 입력해주세요');
      setPasswordError(true);
    } else {
      setPasswordErrorMessage('');
      setPasswordError(false);
    }
    setPassword(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email != '' && password != '') {
      setLoginErrorMessage('');
      dispatch(userLogin({ email, password }))
        .then((data) => {
          if (data.type == 'auth/USER_LOGIN/fulfilled') {
            navigate('/')
          } else {
            setLoginErrorMessage(data.payload);
          }
        })
        .catch((err) => {
          console.log('실패', err);
        });
    } else {
      setLoginErrorMessage('로그인에 실패하였습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <S.LoginContainer>
        <S.LoginContent>
          <img
            src={process.env.PUBLIC_URL + '/images/b_chr.png'}
            alt="로고"
            onClick={() => {
              navigate('/');
            }}
          />
          <h1>로그인</h1>
          <S.LoginWrap>
            <form>
              <S.InputWrap>
                <S.SubTitle htmlFor="loginId" className="subTitle">
                  이메일
                </S.SubTitle>
                <S.LoginInput
                  type="text"
                  id="loginId"
                  className="loginInput"
                  onChange={emailChange}
                  color={emailErrorMessage == '' ? undefined : 'red'}
                ></S.LoginInput>
                <S.LoginErrMsg>{emailErrorMessage}</S.LoginErrMsg>
              </S.InputWrap>
              <S.InputWrap>
                <S.SubTitle htmlFor="loginPassword" className="subTitle">
                  비밀번호
                </S.SubTitle>
                <S.LoginInput
                  type="password"
                  id="loginPassword"
                  className="loginInput"
                  onChange={passwordChange}
                  color={passwordErrorMessage == '' ? undefined : 'red'}
                ></S.LoginInput>
                <S.LoginErrMsg>{passwordErrorMessage}</S.LoginErrMsg>
              </S.InputWrap>
              <S.LoginErrMsg mt={'50px'}>{loginErrorMessage}</S.LoginErrMsg>
              <button onClick={handleSubmit}>로그인</button>
            </form>
            <S.LinkWrap>
              <a href="#" className="googleLogin">
                구글계정으로 로그인하기
              </a>
              <a
                href="#"
                className="signup"
                onClick={() => {
                  navigate('/signup');
                }}
              >
                회원가입하러가기
              </a>
            </S.LinkWrap>
          </S.LoginWrap>
        </S.LoginContent>
      </S.LoginContainer>
    </>
  );
}
