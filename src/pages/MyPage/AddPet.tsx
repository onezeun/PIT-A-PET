import React, { useEffect, useRef } from 'react';
import * as S from './MyPage.styles';

export default function addPet(): JSX.Element {
  const uploadImg = useRef<any>('');
  
  return (
    <S.AddPet>
      <input type="file" className="imgInput" id="imgInput" ref={uploadImg}></input>
      <label htmlFor="imgInput" className='imgLabel'>반려동물 이미지 업로드</label>
      <S.AddPetImg
        src={process.env.PUBLIC_URL + '/images/profile.png'}
        id="petImg"
        alt="프로필 이미지"
      />
      <S.AddPetImgBtn onClick={() => uploadImg.current.click()}>
        이미지 업로드
      </S.AddPetImgBtn>
      <S.InputWrap>
        <S.SubTitle htmlFor="petName" className="subTitle">
          반려동물 이름
        </S.SubTitle>
        <S.addPetInput type="text" id="petName" className="addPetInput"></S.addPetInput>
      </S.InputWrap>

      <S.InputWrap>
        <S.SubTitle htmlFor="petType" className="subTitle">
          종류
        </S.SubTitle>
        <S.addPetInput type="text" id="petType" className="addPetInput"></S.addPetInput>
      </S.InputWrap>

      <S.InputWrap>
        <S.SubTitle htmlFor="petAge" className="subTitle">
          나이
        </S.SubTitle>
        <S.addPetInput type="text" id="petAge" className="addPetInput"></S.addPetInput>
      </S.InputWrap>

      <S.InputWrap>
        <S.SubTitle htmlFor="petGender" className="subTitle">
          성별
        </S.SubTitle>
        <S.addPetInput type="text" id="petGender" className="signUpInput"></S.addPetInput>
      </S.InputWrap>
    </S.AddPet>
  );
}
