import styled, { css } from 'styled-components/macro';

export const LoginContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: auto;

  & h1 {
    font-family: 'KOTRAHOPE';
    font-size: 40px;
  }
`;

export const LoginContent = styled.div`
  margin-top: 5vh;
  text-align: center;

  & img {
    width: 100px;
    height: auto;
    margin-bottom: 20px;
    cursor:pointer;
  }

  & h1 {
    color: ${(props) => props.theme.colors.BLUE};
    font-family: 'IM_Hyemin-Bold';
    font-size: 40px;
    margin-bottom: 50px;
  }
`;

export const LoginWrap = styled.div`
  & button {
    margin: 30px auto 0;
    font-family: 'IM_Hyemin-Bold';
    font-size: 1.5rem;
    width: 300px;
    height: 40px;
    background: ${(props) => props.theme.colors.BLUE};
    color: white;
    border: none;
    border-radius: 5px;
  }
`;

export const InputWrap = styled.div`
  width: 300px;
  text-align: left;
  margin: 20px auto 0;
`;

export const SubTitle = styled.label`
  color: ${(props) => props.theme.colors.BLUE};
`;

export const LoginInput = styled.input`
  color: ${(props) => props.theme.colors.BLUE};
  margin: 5px auto 0;
  padding: 10px;
  width: 300px;
  height: 40px;
  display: block;
  border: 1px solid ${(props) => props.theme.colors.BLUE};
  border-radius: 5px;
`;

export const LinkWrap = styled.div`
  margin: auto;

  & a {
    color: ${(props) => props.theme.colors.BLUE};
    width: 300px;
    height: 40px;
    display: block;
    border: 1px solid ${(props) => props.theme.colors.BLUE};
    border-radius: 5px;
    margin: 10px auto;
    line-height: 40px;
  }
`;