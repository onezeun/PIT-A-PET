import { DefaultTheme } from 'styled-components';

const colors = {
  WHITE: '#FFFFFF',
  BLACK: '#000000'
};

export const breakpoints  = {
  mobile: 425,
  tablet: 768,
  desktop: 1024,
};

const Media = {
  mobile: `(max-width: ${breakpoints.mobile}px)`,
  tablet: `(max-width: ${breakpoints.tablet}px)`,
  desktop: `(max-width: ${breakpoints.desktop}px)`,
} as const;

const theme: DefaultTheme = {
  colors,
  Media
}