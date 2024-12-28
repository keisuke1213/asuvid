import { Container, Typography, Paper, Box, Grid, Button } from "@mui/material";
import Link from "next/link";
import { deadlineColor } from "../ui/style";
import { dateColor } from "../ui/style";
import { fetchListData } from "../serverAction/fetchListData";
import { removeLeadingZero } from "../util/removeLeadingZero";

const titleStyle = {
  fontSize: "19px",
  fontWeight: 600,
  ml: 1,
  mt: 0.6,
};

export const InfoIndex = async () => {
  const infos = await fetchListData();
  const info = infos.map((info) => {
    return {
      id: info.id,
      name: info.name,
      content: info.content,
      deadline: removeLeadingZero(info.deadline!),
      formUrl: info.formUrl,
      status: info.status,
      dates: info.dates!.map((date) => ({
        ...date,
        date: removeLeadingZero(date.date),
      })),
    };
  });

  return (
    <Container>
      {info && info.length > 0 ? (
        <Grid container spacing={3}>
          {info.flat().map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Paper
                elevation={3}
                sx={{ pt: 1, pb: 1.5, px: 2, position: "relative" }}
              >
                {item.status === "DEADLINE_APPROACHING" ? (
                  <Box
                    sx={{
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50px",
                      padding: "5px 10px",
                      display: "inline-block",
                      mb: 1,
                      mt: 0.3,
                    }}
                  >
                    <Typography variant="body1" align="center">
                      締め切り間近
                    </Typography>
                  </Box>
                ) : null}
                <Box sx={{ position: "absolute", top: 8, right: 8 }}></Box>
                <Typography sx={titleStyle} gutterBottom>
                  {item.name}
                </Typography>
                {item.dates && item.dates.length > 0 ? (
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ mt: 1.2, ml: 1 }}
                  >
                    開催日:{" "}
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: "bold",
                        color: dateColor,
                        fontSize: "20px",
                      }}
                    >
                      {item.dates.map((date) => date.date).join(", ")}
                    </Typography>
                  </Typography>
                ) : null}
                {item.deadline ? (
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ mt: 1, ml: 1 }}
                  >
                    締め切り:{" "}
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: "bold",
                        color: deadlineColor,
                        fontSize: "20px",
                      }}
                    >
                      {item.deadline}
                    </Typography>
                  </Typography>
                ) : null}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ mt: 2, mx: 2 }}
                >
                  {item.formUrl ? (
                    <Typography variant="body1" gutterBottom>
                      <Link href={item.formUrl}>URL</Link>
                    </Typography>
                  ) : null}
                  <Typography variant="body1" gutterBottom>
                    <Link
                      href={{
                        pathname: `/displayInfo/${item.id}`,
                        query: {
                          id: item.id,
                        },
                      }}
                    >
                      詳細
                    </Link>
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>現在募集している活動はありません。</p>
      )}
    </Container>
  );
};
