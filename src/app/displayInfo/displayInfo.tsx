import { Container, Typography, Paper, Box, Grid } from "@mui/material";
import MenuIcon from "../ui/menu";

type Info = {
  id: number;
  name: string;
  date: string;
  deadline: string;
  formUrl: string;
};

const getInfos = async (): Promise<Info[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }
  const res = await fetch(apiUrl, { cache: "no-store" });
  const data = await res.json();
  return data;
};

export const DisplayInfo = async () => {
  const info = await getInfos();

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          ボランティア情報一覧
        </Typography>
        <Grid container spacing={3}>
          {info.map((info) => (
            <Grid item xs={12} sm={6} md={4} key={info.id}>
              <Paper elevation={3} sx={{ p: 2, position: "relative" }}>
                <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                  <MenuIcon />
                </Box>
                <Typography variant="h6" component="h2" gutterBottom>
                  {info.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  日時: {info.date}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  締め切り: {info.deadline}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  フォームURL: {info.formUrl}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
