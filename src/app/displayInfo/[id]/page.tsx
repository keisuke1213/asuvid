import { getInfo } from "@/app/serverAction/getInfo";
import { LoadingImage } from "@/app/util/LoadingImage";
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";
import { Suspense } from "react";

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

const DisplayInfo = async ({ params: { id } }: { params: { id: number } }) => {
  console.log(id);

  const info = await getInfo(Number(id));
  if (!info) {
    throw new Error("Info not found");
  }

  console.log(info);
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        DisplayInfo
      </Typography>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              {info.name}
            </Typography>
            <Typography color="textSecondary">{info.content}</Typography>
            <Typography variant="h6" component="h3" gutterBottom>
              Dates
            </Typography>
            <List>
              {info.dates.map((date) => (
                <ListItem key={date.id}>
                  <ListItemText
                    primary={new Date(date.date).toLocaleDateString()}
                  />
                </ListItem>
              ))}
            </List>
            <Typography variant="body2" component="p">
              Deadline: {new Date(info.deadline).toLocaleDateString()}
            </Typography>
            {info.formUrl && (
              <Typography variant="body2" component="p">
                Form URL:{" "}
                <Link href={info.formUrl} target="_blank" rel="noopener">
                  {info.formUrl}
                </Link>
              </Typography>
            )}
          </CardContent>
        </Card>
    </Container>
  );
};

export default DisplayInfo;
