import { createTheme, responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    primaryAppBar: {
      height: number;
    };
    primaryDraw: {
      width: number;
      closed: number;
    };
    secondaryDraw: {
      width: number;
    };
  }
  interface ThemeOptions {
    primaryAppBar: {
      height: number;
    };
    primaryDraw: {
      width: number;
      closed: number;
    };
    secondaryDraw: {
      width: number;
    };
  }
}

export const createMuiTheme = (mode: "light" | "dark") => {
  let theme = createTheme({
    typography: {
      fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
      body1: {
        fontWeight: 500,
        letterSpacing: "-0.5px",
      },
      body2: {
        fontWeight: 500,
        fontSize: "15px",
        letterSpacing: "-0.5px",
      },
    },
    primaryAppBar: {
      height: 50,
    },
    primaryDraw: {
      width: 240,
      closed: 70,
    },
    secondaryDraw: {
      width: 240,
    },
    palette: {
      mode,
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          color: "default",
          elevation: 0,
        },
      },
    },
  });
  theme = responsiveFontSizes(theme);
  return theme;
};
export default createMuiTheme;
