import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#10439F",
            },
            secondary: {
              main: "#874CCC",
            },
            background: {
              default: "#f5f5f5",
              paper: "#ffffff",
            },
          }
        : {
            primary: {
              main: "#C65BCF",
            },
            secondary: {
              main: "#F27BBD",
            },
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
          }),
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
  });
