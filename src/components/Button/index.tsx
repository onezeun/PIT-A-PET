import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components/macro';
import { theme } from '../../styles/theme';

interface ButtonStyle {
  display? : string;
  width?: string;
  height?: string;
  margin?: string;
  buttonColor?: string;
  borderRadius?: string;
  fontColor?: string;
  fontSize?: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyle {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ className, children, ...rest }: ButtonProps): JSX.Element {
  return (
    <ButtonStyled className={className} {...rest}>
      {children}
    </ButtonStyled>
  );
}
const ButtonStyled = styled.button<ButtonStyle>`
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border: none;
  ${({
    display = 'inline-flex',
    width = '150px',
    height = '40px',
    margin = '0',
    buttonColor = 'white',
    borderRadius = '5px',
    fontColor = 'white',
    fontSize = '1rem',
  }) => css`
    display: ${display};
    width: ${width};
    height: ${height};
    margin: ${margin};
    background-color: ${(props) => props.theme.colors[buttonColor]};
    border-radius: ${borderRadius};
    color: ${(props) => props.theme.colors[fontColor]};
    font-size: ${fontSize};
  `}
`;
