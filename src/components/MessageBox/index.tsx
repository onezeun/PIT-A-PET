import React, { useEffect, useState } from 'react';
import * as S from './MessageBox.styles';
import Edit from 'components/Edit';

export default function MessageBox(): JSX.Element {
  const [editOpen, setEditOpen] = useState(false);
  const [user, setUser] = useState('1'); // 1 로그인 2 로그인(반려동물 X) 3 비회원
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user == '1') {
      setMessage('😍 귀여운 반려동물을 공유해주세요');
    } else if (user == '2') {
      setMessage('좋아요로 귀여움을 표시해보세용 ㅋ');
    } else {
      setMessage('회원가입 후 편하게 즐겨보세요!');
    }
  });

  return (
    <S.MessageBoxWrap
      className={editOpen ? 'open' : ''}
      onClick={() => {
        if (user == '1') {
          if (editOpen == false) {
            setEditOpen(true);
          };
        }
      }}
    >
      {editOpen == false ? message : <Edit setEditOpen={setEditOpen}/>}
    </S.MessageBoxWrap>
  );
}
