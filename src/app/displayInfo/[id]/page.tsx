"use client";
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
import { useSearchParams } from "next/navigation";

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

const DisplayInfo =  () => {
  const searchParams = useSearchParams();
  const name = searchParams?.get("name");
  const content = searchParams?.get("content");
  const url = searchParams?.get("url");
  const deadline = searchParams?.get("deadline");
  const dates = searchParams?.getAll("dates");

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        DisplayInfo
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography color="textSecondary">{content}</Typography>
          <Typography variant="h6" component="h3" gutterBottom>
            Dates
          </Typography>
          <List>
            <ListItem >
              <ListItemText primary={dates?.join(", ")} />
            </ListItem>
          </List>
          <Typography variant="body2" component="p">
            Deadline: {deadline}
          </Typography>
          {url && (
            <Typography variant="body2" component="p">
              Form URL:{" "}
              <Link href={url} target="_blank" rel="noopener">
                {url}
              </Link>
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default DisplayInfo;
