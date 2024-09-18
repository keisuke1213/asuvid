import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  Link,
} from "@mui/material";
import { PrismaClient } from "@prisma/client";

type Date = {
  id: number;
  date: string;
  infoId: number;
};

const fetchData = async (id: number) => {
  const prisma = new PrismaClient();
  try {
    const data = await prisma.info.findUnique({
      where: {
        id,
      },
      include: {
        dates: true,
      },
    });
    return data;
  } catch (error: any) {
    console.error("Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
};

const DisplayInfo = async ({ params: { id } }: { params: { id: string } }) => {
  const info = await fetchData(Number(id));

  const removeLeadingZero = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };

  return (
    <Container>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {info?.name}
          </Typography>
          <Typography color="textSecondary" sx={{ mt: 3 }}>
            {info?.content}
          </Typography>
          <List>
            <Typography variant="body1" component="p" sx={{ mt: 2 }}>
              日時 :{" "}
              {info?.dates
                ?.map((date) => removeLeadingZero(date.date))
                .join(", ")}
            </Typography>
          </List>
          <Typography variant="body1" component="p">
            締め切り: {removeLeadingZero(info?.deadline)}
          </Typography>
          {info?.formUrl && (
            <Typography variant="body2" component="p" sx={{ mt: 2 }}>
              URL:{" "}
              <Link href={info?.formUrl} target="_blank" rel="noopener">
                {info?.formUrl}
              </Link>
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default DisplayInfo;
