import { createTheme } from "@mui/material/styles";

import JockeyOneRegular from "../assets/JockeyOne-Regular.ttf";
import JosefinSans from "../assets/JosefinSans-VariableFont_wght.ttf";

import "../App.css";

const main = createTheme({
  typography: {
    fontFamily: "Josefin Sans",
    h1: {
      fontFamily: "'Jockey One', sans-serif",
      fontWeight: 400,
      fontStyle: "normal",
      color: "#0081A7",
    },
    h2: {
      fontFamily: "'Jockey One', sans-serif",
      fontWeight: 400,
      fontStyle: "normal",
      color: "#0081A7",
    },
    h3: {
      fontFamily: "Jockey One",
      color: "#00AFB9",
    },
    h4: {
      fontFamily: "Jockey One",
      color: "#00AFB9",
    },
    body1: {
      color: "#686463",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          "& p": {
            color: "#686463",
          },
        },
      },
    },
  },
});

export default main;
