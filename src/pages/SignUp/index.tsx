import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { userSignUp } from 'store/Auth/auth.slice';
import * as S from './SignUp.styles';

import SignUpSuccess from './SignUpSuccess';

export default function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [nameError, setNameError] = useState(true);

  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [rePasswordErrorMessage, setRePasswordErrorMessage] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [signUpErrorMessage, setSignUpErrorMessage] = useState<any>('');

  const [allCheck, setAllCheck] = useState(false);
  const [successful, setSuccessful] = useState(false);

  useEffect(() => {
    signUpCheck();
  });

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    if (value === '') {
      setEmailErrorMessage('이메일을 입력해주세요');
      setEmailError(true);
    } else if (!emailRegex.test(value)) {
      setEmailErrorMessage('잘못된 형식의 이메일입니다.');
      setEmailError(true);
    } else {
      setEmailErrorMessage('');
      setEmailError(false);
    }
    setEmail(value);
  };

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value === '') {
      setNameErrorMessage('이름을 입력해주세요');
      setNameError(true);
    } else if (value.length > 10) {
      setNameErrorMessage('10글자 이내로 입력해주세요');
      setNameError(true);
    } else {
      setNameErrorMessage('');
      setNameError(false);
    }
    setName(value);
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;
    if (value === '') {
      setPasswordErrorMessage('비밀번호를 입력해주세요');
      setPasswordError(true);
    } else if (!passwordRegex.test(value)) {
      setPasswordErrorMessage(
        '영문/숫자/특수문자 포함 6자 이상, 20자 이하로 입력해주세요',
      );
      setPasswordError(true);
    } else if (value.length < 6 || value.length > 21) {
      setPasswordErrorMessage(
        '영문/숫자/특수문자 포함 6자 이상, 20자 이하로 입력해주세요',
      );
      setPasswordError(true);
    } else {
      setPasswordErrorMessage('');
      setPasswordError(false);
    }
    setPassword(value);
  };

  const rePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (password != value) {
      setRePasswordErrorMessage('비밀번호가 일치하지 않습니다.');
      setPasswordError(true);
    } else {
      setRePasswordErrorMessage('');
      setPasswordError(false);
    }

    setRePassword(value);
  };

  const signUpCheck = () => {
    if (emailError || passwordError || nameError === true) {
      setAllCheck(false);
    } else if (password != rePassword) {
      setAllCheck(false);
    } else setAllCheck(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (allCheck === true) {
      setSignUpErrorMessage('');
      dispatch(userSignUp({ name, email, password }))
        .then((data: any) => {
          // if (typeof data.payload == "object") {
          if (data.type == 'auth/USER_SIGN_UP/fulfilled') {
            setSuccessful(true);
          } else {
            setSignUpErrorMessage(data.payload);
          }
        })
        .catch((err) => {
          console.log(err);
          setSignUpErrorMessage('회원가입에 실패하였습니다 다시 시도해주세요');
        });
    } else {
      setSignUpErrorMessage('회원가입에 실패하였습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <S.SignUpContainer>
        <S.SignUpContent>
          <S.LogoImg
            src={process.env.PUBLIC_URL + '/images/b_chr.png'}
            alt="로고"
            className="logoImg"
            onClick={() => {
              navigate('/');
            }}
          />
          {successful ? (
            <SignUpSuccess />
          ) : (
            <>
              <h1>회원가입</h1>
              <div>
                <form>
                  <S.InputWrap>
                    <S.SubTitle htmlFor="signUpEmail">이메일</S.SubTitle>
                    <S.SignUpInput
                      type="text"
                      id="signUpEmail"
                      onChange={emailChange}
                      color={emailErrorMessage == '' ? undefined : 'red'}
                    ></S.SignUpInput>
                    <S.SignUpErrMsg>{emailErrorMessage}</S.SignUpErrMsg>
                  </S.InputWrap>
                  <S.InputWrap>
                    <S.SubTitle htmlFor="signUpName">이름</S.SubTitle>
                    <S.SignUpInput
                      type="text"
                      id="signUpName"
                      onChange={nameChange}
                      color={nameErrorMessage == '' ? undefined : 'red'}
                    ></S.SignUpInput>
                    <S.SignUpErrMsg>{nameErrorMessage}</S.SignUpErrMsg>
                  </S.InputWrap>
                  <S.InputWrap>
                    <S.SubTitle htmlFor="signUpPassword">비밀번호</S.SubTitle>
                    <S.SignUpInput
                      type="password"
                      id="signUpPassword"
                      onChange={passwordChange}
                      color={passwordErrorMessage == '' ? undefined : 'red'}
                    ></S.SignUpInput>
                    <S.SignUpErrMsg>{passwordErrorMessage}</S.SignUpErrMsg>
                  </S.InputWrap>
                  <S.InputWrap>
                    <S.SubTitle htmlFor="signUpRePassword">
                      비밀번호 확인
                    </S.SubTitle>
                    <S.SignUpInput
                      type="password"
                      id="signUpRePassword"
                      onChange={rePasswordChange}
                      color={rePasswordErrorMessage == '' ? undefined : 'red'}
                    ></S.SignUpInput>
                    <S.SignUpErrMsg>{rePasswordErrorMessage}</S.SignUpErrMsg>
                  </S.InputWrap>
                  <S.SignUpErrMsg mt={'50px'}>
                    {signUpErrorMessage}
                  </S.SignUpErrMsg>
                  <S.SignUpBtn onClick={handleSubmit}>회원가입</S.SignUpBtn>
                </form>
                <S.LinkWrap>
                  <a href="#" className="googleLogin">
                    구글계정으로 회원가입
                  </a>
                  <a
                    href="#"
                    className="signUp"
                    onClick={() => {
                      navigate('/login');
                    }}
                  >
                    로그인하러가기
                  </a>
                </S.LinkWrap>
              </div>
            </>
          )}
        </S.SignUpContent>
      </S.SignUpContainer>
    </>
  );
}
