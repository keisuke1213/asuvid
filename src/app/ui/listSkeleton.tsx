import { Container, Grid, Paper, Skeleton } from "@mui/material";

export const ListSkeleton = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{ pt: 1, pb: 1.5, px: 2, position: "relative" }}
            >
              <Skeleton
                variant="rectangular"
                width={100}
                height={24}
                sx={{ mb: 1 }}
              />
              <Skeleton variant="text" sx={{ fontSize: "1.5rem", mb: 1 }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", mb: 1 }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", mb: 1 }} />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", width: "50%" }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
