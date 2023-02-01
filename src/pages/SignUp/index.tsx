import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { signUpPost } from 'store/Auth/auth.slice';
import * as S from './SignUp.styles';
import PetInfo from './PetInfo';

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
  const [nameErrorMessage, setNameErrorMessage] = useState('');

  const [successful, setSuccessful] = useState(false);

  useEffect(() => {
    if (emailError || passwordError || nameError === true) {
      setSuccessful(false);
    } else if (password != rePassword) {
      setSuccessful(false);
    } else setSuccessful(true);
  });

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    if (value === '') {
      setEmailErrorMessage('이메일를 입력해주세요');
      setEmailError(true);
    } else if (!emailRegex.test(value)) {
      setEmailErrorMessage('잘못된 형식의 이메일입니다.');
      setEmailError(true);
    } else setEmailError(false);
    setEmail(value);
  };

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value === '') {
      setNameErrorMessage('닉네임을 입력해주세요');
      setNameError(true);
    } else if (value.length > 10) {
      setNameErrorMessage('닉네임은 10글자 이내로 입력해주세요');
      setNameError(true);
    } else setNameError(false);
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
    } else setPasswordError(false);
    setPassword(value);
  };

  const rePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePassword(e.target.value);
  };

  // 반려동물 입력
  const [petCheck, setPetCheck] = useState(false);

  const yesPet = (e: any) => {
    e.preventDefault();
    setPetCheck(true);
  };

  const noPet = (e: any) => {
    e.preventDefault();
    setPetCheck(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (successful === true) {
      dispatch(signUpPost({ email, password }))
      .then(() => {
        alert('회원가입을 성공적으로 완료했습니다!');
      })
      .catch((err) => {
        console.log('회원가입에러',err)
        alert('회원가입실패!');
      })
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
          <h1>회원가입</h1>
          <div>
            <form>
              <S.InputWrap onChange={emailChange}>
                <S.SubTitle htmlFor="signUpEmail">이메일</S.SubTitle>
                <S.SignUpInput type="text" id="signUpEmail"></S.SignUpInput>
              </S.InputWrap>
              <S.InputWrap onChange={nameChange}>
                <S.SubTitle htmlFor="signUpName">이름</S.SubTitle>
                <S.SignUpInput type="text" id="signUpName"></S.SignUpInput>
              </S.InputWrap>
              <S.InputWrap onChange={passwordChange}>
                <S.SubTitle htmlFor="signUpPassword">비밀번호</S.SubTitle>
                <S.SignUpInput
                  type="password"
                  id="signUpPassword"
                ></S.SignUpInput>
              </S.InputWrap>
              <S.InputWrap onChange={rePasswordChange}>
                <S.SubTitle htmlFor="signUpRePassword">비밀번호 확인</S.SubTitle>
                <S.SignUpInput
                  type="password"
                  id="signUpRePassword"
                ></S.SignUpInput>
              </S.InputWrap>
              <S.PetCheck>
                <p>반려동물이 있으신가요?</p>
                <input type="radio" name="pet" id="y_pet"></input>
                <label htmlFor="y_pet" onClick={yesPet}>
                  네
                </label>
                <input type="radio" name="pet" id="n_pet"></input>
                <label htmlFor="n_pet" onClick={noPet}>
                  아니오
                </label>
              </S.PetCheck>
              {petCheck == true ? <PetInfo /> : null}
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
        </S.SignUpContent>
      </S.SignUpContainer>
    </>
  );
}
