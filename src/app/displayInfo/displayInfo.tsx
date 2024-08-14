import { Container, Typography, Paper, Box, Grid } from "@mui/material";
import MenuIcon from "./menu";
import { getInfos } from "../serverAction/getInfo"; 
import Link from "next/link";



export const DisplayInfo = async () => {
  const info =  await getInfos();

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
                  <MenuIcon info={info} />
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
                  <Link href={info.formUrl}>申し込みはこちら</Link>
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
