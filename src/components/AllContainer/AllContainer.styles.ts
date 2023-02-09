import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: auto;
  padding-top: 110px;

  @media screen and (min-width: 1024px) {
    padding-top: 110px;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 500px;
  position: relative;
  transition: 0.5s ease;
  padding-bottom:100px;

  @media screen and (min-width: 1024px) {
    padding-bottom:100px;
  }
`;

export const BlankBox = styled.div`
  display: none;

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    display: block;
    width: 200px;
    height: 50vh;
  }

  @media screen and (min-width: 1024px) and (max-width: 1500px) {
    display: block;
    width: 300px;
    height: 50vh;
  }
`;
