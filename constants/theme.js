import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  // base colors
  primary: "#FED100", // yellow
  primary_light: "#FEF5C7", // light yellow
  secondary: "#131717", // gray

  // colors
  black: "#131717",
  white: "#FFFFFF",

  lightGray: "#F5F5F6",
  lightGray2: "#CECECD",
  lightGray3: "#EFEFF1",
  lightGray4: "#F8F8F9",
  transparent: "transparent",
  darkgray: "#898C95",
};

export const SIZES = {
  xs: 8,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  // app dimensions
  width,
  height,
};

export const FONTS = {
  extrabold: "PoppinsExtraBold", //900
  bold: "PoppinsBold", //800
  semibold: "PoppinsSemiBold", //700
  medium: "PoppinsMedium", //600
  regular: "PoppinsRegular", //500
  light: "PoppinsLight", //400
  black: "PoppinsBlack",
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  dark: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
};

const appTheme = { COLORS, SIZES, FONTS, SHADOWS };

export default appTheme;
