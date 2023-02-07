import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { updatePet, deletePet } from 'store/modules/pet.slice';
import * as S from './MyPage.styles';

interface IPetInfo {
  id: string;
  uid: string;
  petImg: any | null;
  petName: string | null;
  petType: string | null;
  petAge: string | null;
  petGender: string | null;
}

interface IProps {
  selectPetData: IPetInfo | null;
  uid: string;
  modalClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function UpdatePet({
  selectPetData,
  uid,
  modalClose,
}: IProps): JSX.Element | null {
  if (selectPetData != null) {
    const dispatch = useDispatch<AppDispatch>();

    const [petImg, setPetImg] = useState<File | null>(null);
    const [petImgUrl, setPetImgUrl] = useState('');
    const [petName, setPetName] = useState(selectPetData.petName);
    const [petType, setPetType] = useState(selectPetData.petType);
    const [petAge, setPetAge] = useState(selectPetData.petAge);
    const [petGender, setPetGender] = useState(selectPetData.petGender);

    const [petNameError, setPetNameError] = useState(false);
    const [petTypeError, setPetTypeError] = useState(false);

    const [petNameErrorMessage, setPetNameErrorMessage] = useState('');
    const [petTypeErrorMessage, setPetTypeErrorMessage] = useState('');

    const petImgUpload = useRef<any>();

    const petImgChange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPetImgUrl(reader.result as string);
      };
      setPetImg(file);
    };

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
        alert('누락된 항목을 확인해주세요');
      } else {
        const id = selectPetData.id;
        dispatch(
          updatePet({ id, uid, petImg, petName, petType, petAge, petGender }),
        )
          .then((data: any) => {
            modalClose;
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
        return;
      }
    };

    const handleDelete = (e: React.FormEvent) => {
      e.preventDefault();
      let answer = confirm('정말 삭제하시겠습니까?');
      const id = selectPetData.id;

      if (answer == true) {
        dispatch(deletePet(id))
          .then((data: any) => {
            modalClose;
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      };
    };

    return (
      <S.PetBox>
        <input
          type="file"
          className="imgInput"
          id="imgInput"
          onChange={petImgChange}
          ref={petImgUpload}
        ></input>
        <label htmlFor="imgInput" className="imgLabel">
          반려동물 이미지 업로드
        </label>
        <S.PetBoxImg
          src={
            petImgUrl
              ? petImgUrl
              : process.env.PUBLIC_URL + selectPetData.petImg
          }
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
          <S.PetBoxInput
            type="text"
            id="petName"
            className="addPetInput"
            onChange={petNameChange}
            value={petName ? petName : undefined}
          ></S.PetBoxInput>
          <S.PetUpErrMsg>{petNameErrorMessage}</S.PetUpErrMsg>
        </S.InputWrap>
        <S.InputWrap>
          <S.SubTitle htmlFor="petType" className="subTitle">
            종류
          </S.SubTitle>
          <S.PetBoxInput
            type="text"
            id="petType"
            className="addPetInput"
            placeholder="EX)강아지, 고슴도치, 도마뱀 등"
            value={petType ? petType : undefined}
            onChange={petTypeChange}
          ></S.PetBoxInput>
          <S.PetUpErrMsg>{petTypeErrorMessage}</S.PetUpErrMsg>
        </S.InputWrap>
        <S.InputWrap>
          <S.SubTitle htmlFor="petAge" className="subTitle">
            나이
          </S.SubTitle>
          <S.PetBoxSelectInput
            id="petAge"
            className="addPetInput"
            value={petAge ? petAge : undefined}
            onChange={(e) => setPetAge(e.target.value)}
          >
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
          <S.PetBoxSelectInput
            id="petGender"
            className="signUpInput"
            value={petGender ? petGender : undefined}
            onChange={(e) => setPetGender(e.target.value)}
          >
            <option value="여">여</option>
            <option value="남">남</option>
            <option value="기타">기타</option>
          </S.PetBoxSelectInput>
        </S.InputWrap>
        <S.ModalBtnBox>
          <S.ModalBtn className="cancel" onClick={handleDelete} btnColor="GREY">
            삭제
          </S.ModalBtn>
          <S.ModalBtn className="save" onClick={handleSubmit}>
            저장
          </S.ModalBtn>
        </S.ModalBtnBox>
      </S.PetBox>
    );
  } else return null;
}
