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
  }

  & h1 {
    color:#5eb5e0;
    font-family: 'IM_Hyemin-Bold';
    font-size: 40px;
    margin-bottom: 50px;
  }

  & .loginWrap {
    & .inputWrap {
      width:300px;
      text-align: left;
      margin: 20px auto 0;
    }
    & .subTitle {
      color:#5eb5e0;
    }

    & .loginInput {
      color:#5eb5e0;
      margin: 5px auto 0;
      padding: 10px;
      width: 300px;
      height: 40px;
      display: block;
      border: 1px solid #5eb5e0;
      border-radius: 5px;
    }

    & button {
      margin: 30px auto 0;
      font-family: 'IM_Hyemin-Bold';
      font-size: 1.5rem;
      width: 300px;
      height: 40px;
      background: #5eb5e0;
      color: white;
      border: none;
      border-radius: 5px;
    }
  }

  & .linkWrap {
    margin: auto;
  }

  & a {
    color:#5eb5e0;
    width: 300px;
    height: 40px;
    display: block;
    border: 1px solid #5eb5e0;
    border-radius:5px;
    margin:10px auto;
    line-height: 40px;
  }
`;
