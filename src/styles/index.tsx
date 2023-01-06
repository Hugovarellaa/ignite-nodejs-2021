import { createStitches } from "@stitches/react";

export const {
  config,
  styled,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  css,
} = createStitches({
  theme: {
    colors: {
      gree300: "#00B37E",
      gree700: "#00875F",

      gray100: "#E1E1E6",
      gray200: "#C4C4CC",
      gray600: "#202024",

      gray900: "#121214",

      white: "#ffffff",
    },
  },
});
