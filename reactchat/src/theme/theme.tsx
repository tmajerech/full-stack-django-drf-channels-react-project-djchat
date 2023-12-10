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
      closed: number;
      minWidth: number;
    };
  }
  interface ThemeOptions {
    primaryAppBar?: {
      height?: number;
    };
    primaryDraw?: {
      width?: number;
      closed: number;
    };
    secondaryDraw: {
      width: number;
      closed: number;
      minWidth: number;
    };
  }
}

export const createMuiTheme = () => {
  let theme = createTheme({
    typography: {
      fontFamily: ["Roboto", "sans-serif"].join(","),

      body1: {
        fontWeight: 500,
        letterSpacing: "-0.5px",
      },
    },

    primaryAppBar: {
      height: 50,
    },
    primaryDraw: {
      width: 200,
      closed: 70,
    },
    secondaryDraw: {
      width: 240,
      closed: 70,
      minWidth: 100,
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
