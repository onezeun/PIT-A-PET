import React, { useState, useEffect } from 'react';
// import * as S from './Main.styles';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';

import AllContainer from 'components/AllContainer';
import MessageBox from 'components/MessageBox';
import Card from 'components/Card';
import { getAllPost } from 'store/modules/post.slice';

interface IPostInfo {
  id: string;
  uid: string;
  postContent: string | null;
  postImg: File | null;
}

export default function Main(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [postData, setPostData] = useState<IPostInfo[] | null>(null);

  useEffect(() => {
    if (postData !== undefined) {
      fetchData();
    }
  }, [])

  // 전체게시글 
  const fetchData = () => {
    dispatch(getAllPost())
      .then((data) => {
        setPostData(data.payload);
      })
  }

  return (
    <AllContainer>
      <MessageBox></MessageBox>
      {postData != undefined ? postData.map((post, i: number): JSX.Element => {
        return (
          <Card postData={post} key={i}></Card>
        )
      }) : null}
    </AllContainer>
  );
}
