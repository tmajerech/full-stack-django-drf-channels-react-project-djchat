import { Box, useTheme } from "@mui/material";

const Main = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
        mt: `${theme.primaryAppBar.height}px`,
        flexGrow: 1,
				overflow: "hidden"
      }}
    >
			asdf
		</Box>
  );
};

export default Main;
