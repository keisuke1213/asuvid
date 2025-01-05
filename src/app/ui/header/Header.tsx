"use client";
import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  Divider,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Search } from "./Search";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Buttons } from "./Buttons";
import { LinkSwitch } from "./LInkSwitch";

export const Header = ({ props }: { props: string }) => {
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

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams!);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <Box sx={{ mb: 1.5 }}>
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
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <div
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <LinkSwitch props={props} />
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
            {props !== "/admin" && (
              <Search
                searchParams={searchParams!}
                handleSearch={handleSearch}
              />
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {props !== "/admin" && (
        <Buttons handleSearch={handleSearch} handleRedirect={handleRedirect} />
      )}
    </Box>
  );
};
