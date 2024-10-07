"use client";
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  Box,
  Button,
} from "@mui/material";
import { dateColor } from "@/app/ui/style";
import { deadlineColor } from "@/app/ui/style";
import Link from "next/link";
import { FC } from "react";
import { InfoContainer } from "@/app/types/infoType";
import { removeLeadingZero } from "@/app/util/removeLeadingZero";
import DeleteModal from "./deleteModal/DeleteModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";

const titleStyle = {
  fontSize: "23x",
  fontWeight: 600,
  mt: 1.3,
};

export const InfoDetail: FC<InfoContainer> = ({ info }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    setLoading(true);
    router.push(`${info?.id}/edit`);
  };

  return (
    <Container>
      <Card sx={{ mt: 4.6 }}>
        <CardContent>
          <Typography variant="h5" component="h2" sx={titleStyle}>
            {info?.name}
          </Typography>
          <Typography color="textSecondary" sx={{ mt: 3 }}>
            {info?.content}
          </Typography>
          <List>
            {info?.dates && info?.dates.length > 0 ? (
              <Typography variant="body1" component="p" sx={{ mt: 1.6 }}>
                日時 :{" "}
                <Typography
                  component="span"
                  sx={{
                    fontWeight: "bold",
                    color: dateColor,
                    fontSize: "22px",
                  }}
                >
                  {info?.dates
                    ?.map((date) => removeLeadingZero(date.date))
                    .join(", ")}
                </Typography>
              </Typography>
            ) : null}
          </List>
          {info?.deadline ? (
            <Typography variant="body1" component="p">
              締め切り:{" "}
              <Typography
                component="span"
                sx={{
                  fontWeight: "bold",
                  color: deadlineColor,
                  fontSize: "22px",
                }}
              >
                {removeLeadingZero(info?.deadline)}
              </Typography>
            </Typography>
          ) : null}
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
      <Box sx={{ mt: 2 }} display="flex" justifyContent="space-between">
        <Link href="/" passHref>
          <Typography variant="body1" sx={{ ml: 1.2 }}>
            戻る
          </Typography>
        </Link>
        <Box display="flex" alignItems="center" sx={{ gap: 1.5 }}>
          <LoadingButton
            variant="outlined"
            size="small"
            loading={loading}
            onClick={handleClick}
          >
            <Typography variant="body2">編集</Typography>
          </LoadingButton>
          <Button onClick={handleOpen} variant="outlined" size="small">
            <Typography variant="body2">削除</Typography>
          </Button>
        </Box>
      </Box>
      <DeleteModal id={info?.id} handleClose={handleClose} open={isOpen} />
    </Container>
  );
};
