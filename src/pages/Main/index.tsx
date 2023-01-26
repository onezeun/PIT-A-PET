import React from 'react';
// import * as S from './Main.styles';

import AllContainer from 'components/AllContainer';
import MessageBox from 'components/MessageBox';
import Card from 'components/Card';

export default function Main() {
  return (
    <AllContainer>
      <MessageBox></MessageBox>
      <Card></Card>
    </AllContainer>
  );
}
