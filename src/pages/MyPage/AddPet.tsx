import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { createPet } from 'store/Pet/pet.slice';
import { apiKey } from '../../Firebase';
import * as S from './MyPage.styles';
interface IProps {
  uid: string;
  modalClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function AddPet(props: IProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const [uid, setUid] = useState('');


  const [petImg, setPetImg] = useState({});
  const [img, setimg] = useState();
  const [petImgUrl, setPetImgUrl] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petAge, setPetAge] = useState('모름');
  const [petGender, setPetGender] = useState('여');

  const [petNameError, setPetNameError] = useState(true);
  const [petTypeError, setPetTypeError] = useState(true);

  const [petNameErrorMessage, setPetNameErrorMessage] = useState('');
  const [petTypeErrorMessage, setPetTypeErrorMessage] = useState('');

  const [allCheck, setAllCheck] = useState(false);

  const petImgUpload = useRef<any>();

  useEffect(() => {
    setUid(props.uid);
  })

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

  const addPetCheck = () => {
    if (petNameError || petTypeError || petImg) {
      setAllCheck(false);
    } else setAllCheck(true);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allCheck) {
      dispatch(createPet({ uid, petImg, petName, petType, petAge, petGender }))
        .then((data: any) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err)
        })
      return;
    };

    props.modalClose;
  }

  return (
    <S.AddPet>
      <input type="file" className="imgInput" id="imgInput" onChange={petImgChange} ref={petImgUpload}></input>
      <label htmlFor="imgInput" className='imgLabel'>반려동물 이미지 업로드</label>
      <S.AddPetImg
        src={petImgUrl ? petImgUrl : process.env.PUBLIC_URL + '/images/pet_default_img.png'}
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
        <S.addPetInput type="text" id="petName" className="addPetInput" onChange={petNameChange}></S.addPetInput>
      </S.InputWrap>

      <S.InputWrap>
        <S.SubTitle htmlFor="petType" className="subTitle">
          종류
        </S.SubTitle>
        <S.addPetInput type="text" id="petType" className="addPetInput" placeholder='EX)강아지, 고슴도치, 도마뱀 등' onChange={petTypeChange}></S.addPetInput>
      </S.InputWrap>

      <S.InputWrap>
        <S.SubTitle htmlFor="petAge" className="subTitle">
          나이
        </S.SubTitle>
        <S.addPetSelectInput id="petAge" className="addPetInput" onChange={(e) => setPetAge(e.target.value)}>
          <option value="none">모름</option>
          <option value="0~10">0~10</option>
          <option value="11~20">11~20</option>
          <option value="21~30">21~30</option>
          <option value="30이상">30이상</option>
        </S.addPetSelectInput>
      </S.InputWrap>

      <S.InputWrap>
        <S.SubTitle htmlFor="petGender" className="subTitle">
          성별
        </S.SubTitle>
        <S.addPetSelectInput id="petGender" className="signUpInput" onChange={(e) => setPetGender(e.target.value)}>
          <option value="여">여</option>
          <option value="남">남</option>
          <option value="기타">기타</option>
        </S.addPetSelectInput>
      </S.InputWrap>
      <S.ModalSaveBtn className="save" onClick={handleSubmit}>
          저장
        </S.ModalSaveBtn>
    </S.AddPet>
  );
}
