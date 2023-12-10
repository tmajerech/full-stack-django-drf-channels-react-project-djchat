import { Box, useTheme } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Main: React.FC<Props> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
        mt: `${theme.primaryAppBar.height}px`,
        flexGrow: 1,
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  );
};

export default Main;
