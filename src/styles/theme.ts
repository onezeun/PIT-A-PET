import { DefaultTheme } from 'styled-components';

const colors = {
  WHITE: '#FFFFFF',
  BLACK: '#000000'
};

export const breakpoints  = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
};

const media = {
  mobile: `(min-width: ${breakpoints.mobile}px)`,
  tablet: `(min-width: ${breakpoints.tablet}px)`,
  desktop: `(min-width: ${breakpoints.desktop}px)`,
} as const;

export const theme: DefaultTheme = {
  colors,
  media
}