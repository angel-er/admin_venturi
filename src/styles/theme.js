import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#EFF0ED",
      // paper: "#FFF0F4"
    },
    primary: {
      main: "#E30046",
    },
    secondary: {
      main: "#009AA5",
      light: "#E0F3F4",
    },
    grey: {
      50: "#F9F9F8",
      100: "#EFF0ED",
      200: "#E2E3DD",
      300: "#D4D5CE",
      400: "#C0C1BB",
      500: "#A4A5A3",
      600: "#8F9090",
      700: "#6E6E6E",
      800: "#3B3B3B",
      900: "#191919",
    },
  },
  customColors: {
    actions: {
      dangerBackground: "#F8D0D0",
      danger: "#DA1414",
      infoBackground: "#D3EAFD",
      info: "#2196F3",
      successBackground: "#DBEFDC",
      success: "#4CAF50",
      warningBackground: "#FFEACC",
      warning: "#FF9800",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: 30,
      fontWeight: 500,
      lineHeight: "36px",
      color: "#191919",
    },
    h2: {
      fontSize: "2.3em",
      fontWeight: 700,
      color: "#17375F",
    },
    subtitle1: {
      fontSize: 24,
      fontWeight: 700,
      color: "#212B36",
    },
    subtitle2: {
      fontSize: 18,
      fontWeight: 500,
      color: "#E30046",
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      color: "#6E6E6E",
    },
    body2: {
      fontSize: 14,
      fontWeight: 500,
    },
    button: {
      color: "#00052D",
    },
  },
});

export default theme;
