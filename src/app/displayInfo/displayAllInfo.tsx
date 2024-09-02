import { Container, Typography, Paper, Box, Grid, Button } from "@mui/material";
import { FC } from "react";
import Link from "next/link";

type DateType = {
  id: number;
  date: string;
  infoId: number;
};

type Info = {
  id: number;
  name: string;
  content: string;
  deadline: string;
  formUrl: string | null;
  dates: DateType[];
};

type DisplayInfoProps = {
  info: Info[];
};

export const DisplayAllInfo: FC<DisplayInfoProps> = ({ info }) => {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          募集一覧
        </Typography>
        <Grid container spacing={3}>
          {info.flat().map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Paper elevation={3} sx={{ p: 2, position: "relative" }}>
                <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                </Box>
                <Typography variant="h6" component="h2" gutterBottom>
                  {item.name}
                </Typography>
                {item.dates ? (
                  <Typography variant="body1" gutterBottom>
                    開催日: {item.dates.map((date) => date.date).join(", ")}
                  </Typography>
                ) : null}
                {item.deadline ? (
                  <Typography variant="body1" gutterBottom>
                    締め切り: {item.deadline}
                  </Typography>
                ) : null}
                <Button>
                  <Link
                    href={{
                      pathname: `/displayInfo/${item.id}`,
                      query: {
                        id: item.id,
                        name: item.name,
                        content: item.content,
                        url: item.formUrl,
                        deadline: item.deadline,
                        dates: item.dates.map((date) => date.date),
                      },
                    }}
                  >
                    詳細
                  </Link>
                </Button>
                {item.formUrl ? (
                  <Typography variant="body1" gutterBottom>
                    <Link href={item.formUrl}>申し込みはこちら</Link>
                  </Typography>
                ) : null}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
