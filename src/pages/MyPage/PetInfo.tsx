import React, { useEffect, useRef } from 'react';
import * as S from '../SignUp/SignUp.styles';
import profile from '../../assets/images/profile.png'

export default function PetInfo(): JSX.Element {
  const uploadImg = useRef<any>('');
  
  return (
    <S.PetInfoBox>
      <input type="file" className="imgInput" id="imgInput" ref={uploadImg}></input>
      <label htmlFor="imgInput" className='imgLabel'>반려동물 이미지 업로드</label>
      <S.PetImg
        src={process.env.PUBLIC_URL + '/images/profile.png'}
        id="petImg"
        alt="프로필 이미지"
      />
      <S.ImgBtn onClick={() => uploadImg.current.click()}>
        이미지 업로드
      </S.ImgBtn>
      <S.InputWrap>
        <S.SubTitle htmlFor="petName" className="subTitle">
          반려동물 이름
        </S.SubTitle>
        <S.SignUpInput type="text" id="petName" className="signUpInput"></S.SignUpInput>
      </S.InputWrap>

      <S.InputWrap>
        <S.SubTitle htmlFor="petType" className="subTitle">
          종류
        </S.SubTitle>
        <S.SignUpInput type="text" id="petType" className="signUpInput"></S.SignUpInput>
      </S.InputWrap>

      <S.InputWrap>
        <S.SubTitle htmlFor="petAge" className="subTitle">
          나이
        </S.SubTitle>
        <S.SignUpInput type="text" id="petAge" className="signUpInput"></S.SignUpInput>
      </S.InputWrap>

      <S.InputWrap>
        <S.SubTitle htmlFor="petGender" className="subTitle">
          성별
        </S.SubTitle>
        <S.SignUpInput type="text" id="petGender" className="signUpInput"></S.SignUpInput>
      </S.InputWrap>
    </S.PetInfoBox>
  );
}
