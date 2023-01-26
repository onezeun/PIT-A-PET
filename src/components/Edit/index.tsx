import React, { useState, useRef } from 'react';
import * as S from './Edit.styles';

interface Iprops {
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Edit({ setEditOpen }: Iprops): JSX.Element {
  const uploadImg = useRef<any>('');

  const toggleEdit = () => {
    setEditOpen(false);
  };

  const uploadBtn = (e :any) => {
    e.preventDefault();
    uploadImg.current.click();
  }

  return (
    <>
      <form>
        <S.EditTop>
          <S.EditTitleWrap onClick={toggleEdit}>
            <i className="ri-close-fill icolor"></i>
            <p>글 쓰기</p>
          </S.EditTitleWrap>

          <S.EditTopButtonWrap>
            <button>카테고리선택</button>
            <input type='file' className="imgInput" ref={uploadImg}></input>
            <button onClick={uploadBtn}>사진등록</button>
          </S.EditTopButtonWrap>
        </S.EditTop>
        <S.EditContent placeholder="내용을 작성해주세요"></S.EditContent>
        <S.ImgUpload>
          <S.ThumnailImg>사진미리보기</S.ThumnailImg>
        </S.ImgUpload>
        <S.SubmitBtn>글 작성</S.SubmitBtn>
      </form>
    </>
  );
}
