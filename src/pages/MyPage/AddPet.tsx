import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { createPet } from 'store/modules/pet.slice';
import * as S from './MyPage.styles';
interface IProps {
  uid: string;
  modalClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function AddPet({ uid, modalClose }: IProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [petImg, setPetImg] = useState({});
  const [petImgUrl, setPetImgUrl] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petAge, setPetAge] = useState('모름');
  const [petGender, setPetGender] = useState('여');

  const [petNameError, setPetNameError] = useState(true);
  const [petTypeError, setPetTypeError] = useState(true);

  const [petNameErrorMessage, setPetNameErrorMessage] = useState('');
  const [petTypeErrorMessage, setPetTypeErrorMessage] = useState('');

  const petImgUpload = useRef<any>();

  const petImgChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPetImgUrl(reader.result as string);
    }
    setPetImg(file)
  }

  const petNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value === '') {
      setPetNameErrorMessage('반려동물의 이름을 입력해주세요');
      setPetNameError(true);
    } else {
      setPetNameErrorMessage('');
      setPetNameError(false);
    }
    setPetName(value);
  };

  const petTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value === '') {
      setPetTypeErrorMessage('반려동물의 종류를 입력해주세요');
      setPetTypeError(true);
    } else {
      setPetTypeErrorMessage('');
      setPetTypeError(false);
    }
    setPetType(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (petNameError || petTypeError) {
      alert('누락된 항목을 확인해주세요')
    } else if (petImgUrl == '') {
      alert('반려동물의 사진을 넣어주세요')
    } else {
      dispatch(createPet({ uid, petImg, petName, petType, petAge, petGender }))
        .then((res) => {
          alert('저장이 완료되었습니다.');
          window.location.reload();
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <S.PetBox>
      <input type="file" className="imgInput" id="imgInput" onChange={petImgChange} ref={petImgUpload}></input>
      <label htmlFor="imgInput" className='imgLabel'>반려동물 이미지 업로드</label>
      <S.PetBoxImg
        src={petImgUrl ? petImgUrl : process.env.PUBLIC_URL + '/images/pet_default_img.png'}
        id="petImg"
        alt="프로필 이미지"
      />
      <S.PetBoxImgBtn onClick={() => petImgUpload.current.click()}>
        이미지 업로드
      </S.PetBoxImgBtn>
      <S.InputWrap>
        <S.SubTitle htmlFor="petName" className="subTitle">
          반려동물 이름
        </S.SubTitle>
        <S.PetBoxInput type="text" id="petName" className="addPetInput" onChange={petNameChange}></S.PetBoxInput>
        <S.PetUpErrMsg>{petNameErrorMessage}</S.PetUpErrMsg>
      </S.InputWrap>

      <S.InputWrap>
        <S.SubTitle htmlFor="petType" className="subTitle">
          종류
        </S.SubTitle>
        <S.PetBoxInput type="text" id="petType" className="addPetInput" placeholder='EX)강아지, 고슴도치, 도마뱀 등' onChange={petTypeChange}></S.PetBoxInput>
        <S.PetUpErrMsg>{petTypeErrorMessage}</S.PetUpErrMsg>
      </S.InputWrap>

      <S.InputWrap>
        <S.SubTitle htmlFor="petAge" className="subTitle">
          나이
        </S.SubTitle>
        <S.PetBoxSelectInput id="petAge" className="addPetInput" onChange={(e) => setPetAge(e.target.value)}>
          <option value="none">모름</option>
          <option value="0~10">0~10</option>
          <option value="11~20">11~20</option>
          <option value="21~30">21~30</option>
          <option value="30이상">30이상</option>
        </S.PetBoxSelectInput>
      </S.InputWrap>

      <S.InputWrap>
        <S.SubTitle htmlFor="petGender" className="subTitle">
          성별
        </S.SubTitle>
        <S.PetBoxSelectInput id="petGender" className="signUpInput" onChange={(e) => setPetGender(e.target.value)}>
          <option value="여">여</option>
          <option value="남">남</option>
          <option value="기타">기타</option>
        </S.PetBoxSelectInput>
      </S.InputWrap>
      <S.ModalBtnBox>
        <S.ModalBtn className="cancel" onClick={modalClose} btnColor='GREY'>
          취소
        </S.ModalBtn>
        <S.ModalBtn className="save" onClick={handleSubmit}>
          저장
        </S.ModalBtn>
      </S.ModalBtnBox>
    </S.PetBox>
  );
}
