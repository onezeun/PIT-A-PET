import React from 'react';
// import * as S from './Main.styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import AllContainer from 'components/AllContainer';
import MessageBox from 'components/MessageBox';
import Card from 'components/Card';

export default function Main(): JSX.Element {
  let user = useSelector((state: RootState) => state.auth.sessionData) as any;
  console.log(user)
  return (
    <AllContainer>
      <MessageBox></MessageBox>
      <Card></Card>
    </AllContainer>
  );
}
