import styled, { css } from 'styled-components/macro';

export const SignUpContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: auto;
  margin: 0 auto 150px;
`;

export const SignUpContent = styled.div`
  margin-top: 5vh;
  text-align: center;
  & h1 {
    color: ${(props) => props.theme.colors.BLUE};
    font-family: 'IM_Hyemin-Bold';
    font-size: 40px;
    margin-bottom: 50px;
  }
`;

export const LogoImg = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const InputWrap = styled.div`
  width: 300px;
  text-align: left;
  margin: 20px auto 0;
`;

export const SubTitle = styled.label`
  color: ${(props) => props.theme.colors.BLUE};
`;

export const SignUpInput = styled.input`
  color: ${(props) => props.color || props.theme.colors.BLUE};
  margin: 5px auto 0;
  padding: 10px;
  width: 300px;
  height: 40px;
  display: block;
  border: 1px solid ${(props) => props.color || props.theme.colors.BLUE};
  border-radius: 5px;
`;

export const SignUpErrMsg = styled.p<{ mt?: string }>`
  margin-top: ${(props) => props.mt || '5px'};
  font-size: 0.85rem;
  color: red;
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
`;

export const SignUpBtn = styled.div`
  margin: 5px auto 0;
  font-family: 'IM_Hyemin-Bold';
  font-size: 1.5rem;
  width: 300px;
  height: 40px;
  line-height: 40px;
  background: ${(props) => props.theme.colors.BLUE};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const SuccessTitle = styled.div`
  margin: 80px 0 40px 0;
  font-family: 'IM_Hyemin-Bold';
  font-size: 1.8rem;
  line-height: 2rem;
  color: ${(props) => props.theme.colors.GREY_200};

  & span {
    color: ${(props) => props.theme.colors.BLUE};
  }

  & p {
    margin-top: 15px;
    font-size: 1.3rem;
  }
`