import { DefaultTheme } from 'styled-components';

const colors = {
  BLUE: '#5EB5E0',
  YELLOW: '#FFECAC',
  YELLOW_100: '#fff0bc',
  GREY:'#CCCCCC',
  GREY_100: '#8C8C8C',
  GREY_200: '#595959',
  RED:'#FF3E5E',
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