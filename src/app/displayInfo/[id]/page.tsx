"use client";
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
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
      <Card sx={{mt: 4}}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography color="textSecondary" sx={{mt: 3}}>{content}</Typography>
          <List>
            <Typography variant="body1" component="p" sx={{mt: 2}}>
              日時 : {dates?.join(", ")}
            </Typography>
          </List>
          <Typography variant="body1" component="p" >
            締め切り: {deadline}
          </Typography>
          {url && (
            <Typography variant="body2" component="p" sx={{mt: 2}}>
               URL:{" "}
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
