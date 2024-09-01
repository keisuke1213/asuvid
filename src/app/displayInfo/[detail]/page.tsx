"use client";
import { getInfo } from "@/app/serverAction/getInfo";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
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

type DateType = {
  id: number;
  date: string;
  infoId: number;
};

type info = {
  id: number;
  name: string;
  content: string;
  deadline: string;
  formUrl: string | null;
  dates: DateType[];
};

const DisplayInfo = () => {
  console.log("DisplayInfo");
  const [info, setInfo] = useState<info | null | undefined>(null);
  const params = useParams();
  const id = Number(params?.detail);
  console.log(id);

  useEffect(() => {
    const fetchInfo = async () => {
      const info = await getInfo(id);
      setInfo(info);
    };
    fetchInfo();
  }, [id]);

  console.log(info);
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        DisplayInfo
      </Typography>
      {info ? (
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
                  <ListItemText primary={new Date(date.date).toLocaleDateString()} />
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
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
};

export default DisplayInfo;
