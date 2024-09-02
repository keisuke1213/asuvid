
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const LoadingImage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: 'url("/loading.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};


