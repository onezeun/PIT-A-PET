import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { addPost } from 'store/modules/post.slice';
import * as S from './Edit.styles';

interface Iprops {
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Edit({ setEditOpen }: Iprops): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const uploadImg = useRef<any>('');
  let user = useSelector((state: RootState) => state.auth.sessionData) as any;
  const uid = user ? user.uid : null;
  const userName = user ? user.displayName : null;

  const [postDate, setPostDate] = useState<Date | null>(null);
  const [postContent, setPostContent] = useState('');
  const [postImg, setPostImg] = useState({});
  const [postImgUrl, setPostImgUrl] = useState('');

  useEffect(()=> {
    setPostDate(new Date());
  },[])

  const toggleEdit = () => {
    setEditOpen(false);
  };

  const postContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setPostContent(e.target.value);
  };

  const postImgChange = (e: any) => {
    e.preventDefault();

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPostImgUrl(reader.result as string);
    };
    setPostImg(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPostDate(new Date());

    if(postContent == '') {
      // alert('내용을 입력해주세요');
      console.log(postDate)
    } else if(postImgUrl == '') {
      alert('사진을 업로드해주세요');
    } else {
      dispatch(addPost({ uid, userName, postContent, postImg, postDate}))
      .then((data) => {
        window.location.reload();
      })
    }
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
            <input
              type="file"
              className="imgInput"
              ref={uploadImg}
              onChange={postImgChange}
            ></input>
            <button type="button" onClick={() => uploadImg.current.click()}>
              사진등록
            </button>
          </S.EditTopButtonWrap>
        </S.EditTop>
        <S.EditContent placeholder="내용을 작성해주세요" onChange={postContentChange}></S.EditContent>
        <S.ImgUpload>
          {postImgUrl ? (
            <img src={postImgUrl} alt="개시글이미지" />
          ) : (
            <S.ThumnailImg>
              <i className="ri-image-add-fill icon"></i>
            </S.ThumnailImg>
          )}
        </S.ImgUpload>
        <S.SubmitBtn onClick={handleSubmit}>글 작성</S.SubmitBtn>
      </form>
    </>
  );
}
