import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import * as S from './MessageBox.styles';

import Edit from 'components/Edit';

export default function MessageBox(): JSX.Element {
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  let user = useSelector((state: RootState) => state.auth.sessionData) as any;

  // const [uid, setUid] = useState('1'); // 1 로그인 2 로그인(반려동물 X) 3 비회원
  const [message, setMessage] = useState('');

  useEffect(() => {
    if(user != null) {
      setMessage('😍 귀여운 반려동물을 공유해주세요');
    } else {
      setMessage('회원가입 후 반려동물을 공유해보세요! 💗');
    }
  });

  return (
    <S.MessageBoxWrap
      className={editOpen ? 'open' : ''}
      onClick={() => {
        if (user != null) {
          if (editOpen == false) {
            setEditOpen(true);
          }
        } else {
          navigate('/signup')
        }
      }}
    >
      {editOpen == false ? message : null}
      <S.EditBox className={editOpen ? 'opacity' : ''} transition={editOpen ? '1s ease' : '0.1s ease'}>
        <Edit setEditOpen={setEditOpen} />
      </S.EditBox>
    </S.MessageBoxWrap>
  );
}
