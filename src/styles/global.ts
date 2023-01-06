import { globalCss } from ".";

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    "-webkit-font-smoothing": "antialiased",
  },

  body: {
    backgroundColor: "$gray900",
    color: "$gray100",
  },

  "body, input, input, select, textarea": {
    fontFamily: "Roboto sans-serif",
    fontSize: "1rem",
    fontWeight: 400,
  },

  button: {
    cursor: "pointer",
  },

  a: {
    textDecoration: "none",
    color: "inherit",
  },

  "[disabled]": {
    opacity: 0.7,
    cursor: "not-allowed",
  },
});
