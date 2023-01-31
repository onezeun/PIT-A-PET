import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './SignUp.styles';
import PetInfo from './PetInfo';

export default function SignUp(): JSX.Element {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [nickNameError, setNickNameError] = useState(true);

  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [nickNameErrorMessage, setNickNameErrorMessage] = useState('');

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const emailRegex = /^[A-Za-z0-9+]{5,}$/;

    if (value === '') {
      setEmailErrorMessage('이메일를 입력해주세요');
      setEmailError(true);
    } else if (value.length < 5 || value.length > 21) {
      setEmailErrorMessage('이메일는 5자 이상, 20자 이하로 입력해주세요');
      setEmailError(true);
    } else if (!emailRegex.test(value)) {
      setEmailErrorMessage('이메일는 영문, 숫자만 입력 가능합니다');
      setEmailError(true);
    } else setEmailError(false);
    setEmail(value);
  };

  const nickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value === '') {
      setNickNameErrorMessage('닉네임을 입력해주세요');
      setNickNameError(true);
    } else if (value.length > 10) {
      setNickNameErrorMessage('닉네임은 10글자 이내로 입력해주세요');
      setNickNameError(true);
    } else setNickNameError(false);
    setNickName(value);
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



  // const handleSubit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // 회원 가입일때
  //   if (isCreate) {
  //     createUserWithEmailAndPassword(auth, email, pwd)
  //       .then(() => {
  //         alert("회원가입 성공");
  //       })
  //       .catch(e => {
  //         alert(e);
  //       });
  //   }
  // };

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
              <S.InputWrap>
                <S.SubTitle htmlFor="signUpEmail">이메일</S.SubTitle>
                <S.SignUpInput type="text" id="signUpEmail"></S.SignUpInput>
              </S.InputWrap>
              <S.InputWrap>
                <S.SubTitle htmlFor="signUpNickName">닉네임</S.SubTitle>
                <S.SignUpInput
                  type="text"
                  id="signUpNickName"
                ></S.SignUpInput>
              </S.InputWrap>
              <S.InputWrap>
                <S.SubTitle htmlFor="signUpPassword">비밀번호</S.SubTitle>
                <S.SignUpInput
                  type="password"
                  id="signUpPassword"
                ></S.SignUpInput>
              </S.InputWrap>
              <S.InputWrap>
                <S.SubTitle htmlFor="signUpPassword">
                  비밀번호 확인
                </S.SubTitle>
                <S.SignUpInput
                  type="password"
                  id="signUpPassword"
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
              <S.SignUpBtn>회원가입</S.SignUpBtn>
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
