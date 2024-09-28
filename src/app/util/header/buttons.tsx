import { FC } from "react";
import { Box, Button, Typography } from "@mui/material";

type ButtonsProps = {
  handleSearch: (term: string) => void;
  handleRedirect: () => void;
};

export const Buttons: FC<ButtonsProps> = ({ handleSearch, handleRedirect }) => {
  return (
    <Box sx={{ ml: 4, mt: 1.3, display: "flex", gap: 1.5 }}>
      <Box
        sx={{
          backgroundColor: "red",
          borderRadius: "50px",
          padding: "2px 4px",
          display: "inline-block",
          mb: 1,
          mt: 0.3,
        }}
      >
        <Button
          onClick={() => handleSearch("お知らせ")}
          sx={{ color: "white" }}
        >
          お知らせ
        </Button>
      </Box>
      <Box
        sx={{
          backgroundColor: "green",
          borderRadius: "50px",
          padding: "2px 4px",
          display: "inline-block",
          mb: 1,
          mt: 0.3,
        }}
      >
        <Button onClick={() => handleSearch("清掃")} sx={{ color: "white" }}>
          清掃
        </Button>
      </Box>
      <Box
        sx={{
          backgroundColor: "#ffb300",
          color: "green",
          borderRadius: "50px",
          padding: "2px 4px",
          display: "inline-block",
          mb: 1,
          mt: 0.3,
        }}
      >
        <Button onClick={handleRedirect} sx={{ color: "white" }}>
          募集
        </Button>
      </Box>
    </Box>
  );
};
