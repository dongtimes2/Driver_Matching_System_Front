import { DefaultTheme } from "styled-components";

const calRem = (size: number) => `${size / 16}rem`;

const fontSize = {
  xs: calRem(12),
  sm: calRem(14),
  md: calRem(16),
  lg: calRem(18),
  xl: calRem(20),
  subTitle: calRem(24),
  title: calRem(36),
};

const fontWeight = {
  light: 300,
  normal: 400,
  bold: 700,
  heavy: 800,
};

const colors = {
  white: "#ffffff",
  black: "#000000",
  pointPink: "#FD297B",
  pointRose: "#FF5864",
  pointRed: "#FF655B",
  pointGradient: "linear-gradient(0deg, #FD297B 0%, #FF5864 90%, #FF655B 100%)",
  grayLight: "#868f96",
  grayDark: "#393144",
  grayGradient: "linear-gradient(0deg, #394144 0%, #868f96 100%)",
};

export type ColorsTypes = typeof colors;
export type FontSizeTypes = typeof fontSize;
export type FontWeightTypes = typeof fontWeight;

export const theme: DefaultTheme = {
  colors,
  fontSize,
  fontWeight,
};
