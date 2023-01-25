import React from 'react';
import styled from 'styled-components/macro';

export default function AllContainer(props: any) {
  return (
    <Container>
      <Content>{props.children}</Content>
      <BlankBox></BlankBox>
    </Container>
  );
}

const Container = styled.div`
  display:flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: auto;
`;

const Content = styled.div`
  max-width: 1200px;
  position: relative;
`;

const BlankBox = styled.div`
  display: none;

  @media screen and (min-width: 768px) {
    display: block;
    width: 200px;
    height: 50vh;
  }

  @media screen and (min-width: 1024px) {
    display: block;
    width: 300px;
    height: 50vh;
  }
`;
