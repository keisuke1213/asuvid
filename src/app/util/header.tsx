"use client";
import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  AppBar,
  Box,
  Toolbar,
  styled,
  alpha,
  IconButton,
  Typography,
  InputBase,
} from "@mui/material";
import Link from "next/link";
import { Search } from "./search";

export const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <div
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                <ListItemButton>
                  <Link href="/">ホーム</Link>
                </ListItemButton>
                <ListItemButton>
                  <Link href="/carender">カレンダー</Link>
                </ListItemButton>
              </List>
              <Divider />
            </div>
          </Drawer>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            ASUVID
          </Typography>
          <Search />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
