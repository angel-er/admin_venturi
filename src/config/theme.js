import { createTheme } from "@mui/material";

import { green, purple, deepPurple } from "@mui/material/colors";

let theme = createTheme({
  palette: {
    primary: {
      main: "#7600b2",
      normal: purple["A700"],
    },
    secondary: {
      main: "#9500ae",
    },
    neutral: {
      light: "",
      medium: deepPurple[300],
      normal: purple[900],
      main: "#7600b2",
    },
    green: {
      main: green[800],
    },
  },
});

theme = createTheme(theme, {
  typography: {
    link: {
      fontSize: "0.8rem",
      [theme.breakpoints.up("md")]: {
        fontSize: "0.9rem",
      },
      fontWeight: 500,
      color: theme.palette.primary.normal,
      display: "block",
      cursor: "pointer",
    },
    cardTitle: {
      fontSize: "1.2rem",
      display: "block",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
    },
    h7: {
      fontSize: "0.8rem",
    },
    h8: {
      fontSize: "0.7rem",
    },
  },
});
export default theme;
