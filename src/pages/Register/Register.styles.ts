import styled, { css } from 'styled-components/macro';

export const RegisterContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: auto;

  & h1 {
    font-family: 'KOTRAHOPE';
    font-size: 40px;
  }
`;

export const RegisterContent = styled.div`
  margin-top: 5vh;
  text-align: center;

  & .logoImg {
    width: 100px;
    height: auto;
    margin-bottom: 20px;
  }

  & h1 {
    color: ${(props) => props.theme.colors.BLUE};
    font-family: 'IM_Hyemin-Bold';
    font-size: 40px;
    margin-bottom: 50px;
  }

  & .registerWrap {
    & .inputWrap {
      width: 300px;
      text-align: left;
      margin: 20px auto 0;
    }
    & .subTitle {
      color: ${(props) => props.theme.colors.BLUE};
    }

    & .registerInput {
      color: ${(props) => props.theme.colors.BLUE};
      margin: 5px auto 0;
      padding: 10px;
      width: 300px;
      height: 40px;
      display: block;
      border: 1px solid ${(props) => props.theme.colors.BLUE};
      border-radius: 5px;
    }

    & .registerBtn {
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
  }

  & .linkWrap {
    margin: auto;
  }

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

export const PetCheck = styled.div`
  margin: 30px auto;
  max-width: 300px;

  & p {
    font-size: 1.2rem;
    font-weight: bold;
  }

  & input[type="radio"] {
    display : none;
  }

  & label {
    display: inline-block;
    width: 48%;
    height: 35px;
    line-height: 35px;
    margin: 15px 1% 0;
    background:${(props) => props.theme.colors.YELLOW_100};
    border-radius: 5px;
    color:${(props) => props.theme.colors.GREY_200};
  }
`;

export const PetInfoBox = styled.div`
  margin: auto;
  max-width: 300px;

  & p {
    font-size: 0.9rem;
    padding: 10px;
    color: ${(props) => props.theme.colors.GREY_100};
    text-align: left;
    line-height: 25px;
    margin: 10px 0;
    background: rgba(255, 236, 172, 0.6);
    border-radius: 5px;
  }

  & .imgInput, .imgLabel {
    display: none;
  }

  & .petImg {
    width: 120px;
    height: auto;
    margin 10px 0;
  }

  & .imgBtn {
    display: block;
    width: 150px;
    height: 30px;
    margin: auto;
    font-size: 0.9rem;
    background: ${(props) => props.theme.colors.YELLOW_100};
    border: none;
    border-radius: 5px;
    color: ${(props) => props.theme.colors.GREY_200};
  }
`;
