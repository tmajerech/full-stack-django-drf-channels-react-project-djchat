import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import DarkModeSwitch from "./DarkMode/DarkModeSwitch";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";

const AccountButton = () => {
  const [anchorEl, setanchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setanchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setanchorEl(null);
  };

  const renderMenu = (
    <Menu
      open={isMenuOpen}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      keepMounted
      onClose={handleMenuClose}
    >
      <MenuItem>
        <DarkModeSwitch />
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ display: { xs: "flex" } }}>
        <IconButton edge="end" color="inherit" onClick={handleProfileMenuOpen}>
          <AccountCircle />
        </IconButton>
        {renderMenu}
      </Box>
    </>
  );
};

export default AccountButton;
