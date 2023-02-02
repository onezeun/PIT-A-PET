import React, { useState, useRef } from 'react';
import * as S from './MyPage.styles';

export default function addPet(): JSX.Element {
  const [petImg, setPetImg] = useState('');
  const petImgUpload = useRef<any>();

  const petImgChange = () => {
    const file = petImgUpload.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPetImg(reader.result as string);
    }
  }
  
  return (
    <S.AddPet>
      <input type="file" className="imgInput" id="imgInput" onChange={petImgChange} ref={petImgUpload}></input>
      <label htmlFor="imgInput" className='imgLabel'>반려동물 이미지 업로드</label>
      <S.AddPetImg
        src={petImg ? petImg : process.env.PUBLIC_URL + '/images/pet_default_img.png'}
        id="petImg"
        alt="프로필 이미지"
      />
      <S.AddPetImgBtn onClick={() => petImgUpload.current.click()}>
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
