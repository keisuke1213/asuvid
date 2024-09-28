import { FC } from "react";
import { Box, Button, Typography } from "@mui/material";

type ButtonsProps = {
  handleSearch: (term: string) => void;
  handleRedirect: () => void;
};

export const Buttons: FC<ButtonsProps> = ({ handleSearch, handleRedirect }) => {
  return (
    <Box sx={{ ml: 3, mt: 1.3, display: "flex", gap: 1.5 }}>
      <Box
        sx={{
          backgroundColor: "#ef5350",
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
          <Typography variant="body2">お知らせ</Typography>
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
          <Typography variant="body2">清掃</Typography>
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
        <Button onClick={() => handleSearch("終了")} sx={{ color: "white" }}>
          <Typography variant="body2">募集</Typography>
        </Button>
      </Box>
      <Box
        sx={{
          backgroundColor: "grey",
          color: "green",
          borderRadius: "50px",
          padding: "2px 4px",
          display: "inline-block",
          mb: 1,
          mt: 0.3,
        }}
      >
        <Button onClick={handleRedirect} sx={{ color: "white" }}>
          <Typography variant="body2">終了</Typography>
        </Button>
      </Box>
    </Box>
  );
};
