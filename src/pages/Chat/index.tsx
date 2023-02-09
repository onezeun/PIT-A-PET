import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getChatRoom } from 'store/modules/chat.slice';

import * as S from './Chat.styles';
import Button from 'components/Button';

export default function Chat(): JSX.Element | null {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [chatRoomList, setChatRoomList] = useState<any[] | null>(null);
  const [chatRoom, setChatRoom] = useState<any[] | null>(null);

  let user = useSelector((state: RootState) => state.auth.sessionData) as any;
  let currentUid = user.uid;
  let currentuserName = user.displayName;

  useEffect(() => {
    if (chatRoomList == null) {
      chatRoomData();
    }

    if (chatRoomList != null) {
      let chatData: any[] = [];
      chatRoomList.map((list) => {
        let arr = list.userName;
        let filter = arr.filter((el: string) => el != currentuserName);
        let username = filter.shift();

        chatData.push({ id: list.id, name: username });
        setChatRoom(chatData);
      });
    }
  }, [chatRoomList]);

  const chatRoomData = () => {
    dispatch(getChatRoom(currentUid)).then((data: any) => {
      let chatRoomData: any[] = [];
      data.payload.map((data: any) => {
        chatRoomData.push(data);
        setChatRoomList(chatRoomData);
      });
    });
  };
  return (
    <S.ChatRoomContainer>
      <S.ChatWrap>
        {chatRoom ? (
          chatRoom.map((room, i) => {
            return (
              <S.ChatListItem
                onClick={() => navigate(`/chatroom/${room.id}/${room.name}`)}
                key={i}
              >
                <S.OtherInfo>
                  <S.OtherImg
                    src={process.env.PUBLIC_URL + '/images/profile.png'}
                  ></S.OtherImg>
                  <S.OtherName>{room.name}</S.OtherName>
                  <S.LastMessage>마지막 메세지</S.LastMessage>
                </S.OtherInfo>
                <Button
                  width="60px"
                  height="30px"
                  fontSize="0.9rem"
                  buttonColor="BLUE_100"
                  fontColor="WHITE"
                >
                  나가기
                </Button>
              </S.ChatListItem>
            );
          })
        ) : (
          <>
            <S.Null>
              <p>주고받은 메세지가 없습니다.</p>
              <Button
                margin="20px auto 0"
                width="100px"
                height="40px"
                fontSize="1rem"
                buttonColor="YELLOW"
                fontColor="GREY_200"
                onClick={() => navigate('/')}
              >
                홈으로
              </Button>
            </S.Null>
          </>
        )}
      </S.ChatWrap>
    </S.ChatRoomContainer>
  );
}
