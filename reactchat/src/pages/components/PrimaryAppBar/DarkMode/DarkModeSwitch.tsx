import { IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../../../context/DarkModeContext";
import { ToggleOff, ToggleOn } from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";

const DarkModeSwitch = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <>
      <Brightness4Icon sx={{ marginRight: "6px", fontSize: "20px" }} />

      <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
        {theme.palette.mode} mode
      </Typography>
      <IconButton
        sx={{ m: 0, p: 0, pl: 2 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <ToggleOff sx={{ fontSize: "2.5rem", p: 0 }} />
        ) : (
          <ToggleOn sx={{ fontSize: "2.5rem" }} />
        )}
      </IconButton>
    </>
  );
};
export default DarkModeSwitch;
