"use client";
import SearchIcon from "@mui/icons-material/Search";
import { alpha, styled, InputBase, Box } from "@mui/material";
import { FC } from "react";

const SearchCom = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

type SearchProps = {
  searchParams: URLSearchParams;
  handleSearch: (term: string) => void;
};

export const Search: FC<SearchProps> = ({ searchParams, handleSearch }) => {
  return (
    <Box>
      <SearchCom>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams?.get("query")?.toString()}
        />
      </SearchCom>
    </Box>
  );
};
