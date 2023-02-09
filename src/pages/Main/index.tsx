import React, { useState, useEffect, useRef } from 'react';
// import * as S from './Main.styles';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';

import AllContainer from 'components/AllContainer';
import MessageBox from 'components/MessageBox';
import Card from 'components/Card';
import { getAllPost } from 'store/modules/post.slice';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

interface IPostInfo {
  id: string;
  uid: string;
  userName: string;
  postContent: string;
  postImg: File;
  postDate: Date;
}

export default function Main(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [postData, setPostData] = useState<IPostInfo[] | null>(null);
  const [postPage, setPostPage] = useState(1);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    if (postData !== undefined) {
      fetchData();
    }
  },[])

  // 전체게시글 
  const fetchData = () => {
    setFirst(false);
    dispatch(getAllPost())
      .then((data: any) => {
        setPostData(data.payload);
      })
  }

  //useBottomScrollListener(fetchData);

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
