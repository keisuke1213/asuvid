"use client";
import SearchIcon from "@mui/icons-material/Search";
import {
  alpha,
  styled,
  InputBase,
  Button,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

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

export const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(term);
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
    <div>
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
      <Box
        sx={{
          backgroundColor: "white",
          color: "red",
          borderRadius: "50px",
          padding: "5px 10px",
          display: "inline-block",
          mb: 1,
          mt: 0.3,
        }}
      >
        <Button onClick={() => handleSearch("お知らせ")}>
          <Typography variant="body1" align="center">
            お知らせ
          </Typography>
        </Button>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          color: "green",
          borderRadius: "50px",
          padding: "5px 10px",
          display: "inline-block",
          mb: 1,
          mt: 0.3,
        }}
      >
        <Button onClick={() => handleSearch("清掃")}>
          <Typography variant="body1" align="center">
            清掃
          </Typography>
        </Button>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          color: "green",
          borderRadius: "50px",
          padding: "5px 10px",
          display: "inline-block",
          mb: 1,
          mt: 0.3,
        }}
      >
        <Button onClick={handleRedirect}>
          <Typography variant="body1" align="center">
            募集
          </Typography>
        </Button>
      </Box>
    </div>
  );
};
