import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          width: "100%",
          padding: "32px",
          gap: "16px",
          margin: "auto",
          maxWidth: "450px",
          boxShadow:
            "0px 5px 15px 0px hsla(220, 30%, 5%, 0.05), 0px 15px 35px -5px hsla(220, 25%, 10%, 0.05)",
        },
      },
    },
  },
});

const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: "dark",
  },
  components: {
    ...theme.components,
    MuiCard: {
      styleOverrides: {
        root: {
          ...theme.components.MuiCard.styleOverrides.root,
          boxShadow:
            "0px 5px 15px 0px hsla(220, 30%, 5%, 0.5), 0px 15px 35px -5px hsla(220, 25%, 10%, 0.08)",
        },
      },
    },
  },
});
