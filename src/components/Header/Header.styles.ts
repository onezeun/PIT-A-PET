import styled from 'styled-components/macro';

export const HeaderContainer = styled.div`
  display:flex;
  aline-items:center;
  justify-content: space-between;
  max-width: 1200px;
  margin: auto;
  height: 50px;
  padding: 20px;
  line-height: 50px;
`;

export const LogoWrap = styled.div`
  vertical-align: center;
  width: 40px;
  height: 40px;

  & img {
    width: 100%;
    height: 100%;
  }
`;

export const GNB = styled.div`

  & .icolor {
    color: #5EB5E0;
    margin: 0 10px;
    font-size: 40px;
  }
`;