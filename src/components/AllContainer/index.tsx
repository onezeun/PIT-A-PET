import React from 'react';
// import * as S from './AllContainer.styles';

import * as S from './AllContainer.styles'

export default function AllContainer(props: any): JSX.Element {
  return (
    <S.Container>
      <S.Content>{props.children}</S.Content>
      <S.BlankBox></S.BlankBox>
    </S.Container>
  );
}