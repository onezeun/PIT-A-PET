import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0 auto 105px;

  @media screen and (min-width: 1024px) {
    margin: auto;
  }
`;

export const Content = styled.div`
  max-width: 1200px;
  position: relative;
  transition: 0.5s ease;
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
