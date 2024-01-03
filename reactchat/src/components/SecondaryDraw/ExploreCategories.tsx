import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useTheme,
  ListItemIcon,
  Typography,
} from "@mui/material";
import useCrud from "../../hooks/useCrud";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { MEDIA_URL } from "../../config";

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

const ExploreCategories = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { dataCRUD, error, isLoading, fetchData } = useCrud<Category>(
    [],
    "/server/category/"
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          px: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: "sticky",
          top: 0,
          backgroundColor: theme.palette.background.default,
        }}
      >
        Explore
      </Box>
      <List sx={{ py: 0 }}>
        {dataCRUD.map((item) => (
          <ListItem
            disablePadding
            key={item.id}
            sx={{ display: "block" }}
            dense={true}
          >
            <Link
              to={`/explore/${item.name}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ minHeight: 48 }}>
                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                  <ListItemAvatar sx={{ minWidth: "0px" }}>
                    <img
                      alt="server Icon"
                      src={`${MEDIA_URL}${item.icon}`}
                      style={{
                        width: "25px",
                        height: "25px",
                        display: "block",
                        margin: "auto",
                        filter: isDarkMode ? "invert(100%)" : "none",
                      }}
                    />
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      textAlign="start"
                      paddingLeft={1}
                    >
                      {item.name}
                    </Typography>
                  }
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ExploreCategories;
